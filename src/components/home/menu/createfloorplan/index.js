import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { addFloorPLan, getCrewAndManagers, getFloorPlansForDate } from '../../../../firebase/firestore';
import { floorPlan, optional, auxiliary, hours } from './floorplan';
import PDF from './pdf'

const CreateFloorPlan = ({closePage}) => {
    const close = async () => {
        closePage(false)
    }
    
    const [floorList, setFloorList] = useState([]);
    const [editableFloorPlan, setEditableFloorPlan] = useState({...floorPlan});
    const [options, setOptions] = useState({...optional});
    const [aux, setAux] = useState({...auxiliary});
    const [selectedDate, setSelectedDate] = useState(null);
    const [hour, setHour] = useState('');
    const [plansForDay, setPlansForDay] = useState({});
    const [pdf, setPDF] = useState(false);
    const [pdfPlan, setPDFPlan] = useState({});

    useEffect(() => {
        const fullList = async () => {
            let list = await getCrewAndManagers();
            list = list.sort()
            list.unshift('');
            setFloorList(list)
        }
        fullList();
    }, []);
    useEffect(() => {
        const getPlans = async () => {
            if(selectedDate === null) {
                return;
            }
            const dailyPlans = await getFloorPlansForDate(selectedDate);
            setPlansForDay({...dailyPlans.dailyPlans});
        }
        getPlans();
    },[selectedDate]);
    useEffect(() => {
        console.log(plansForDay[hour] );
        if(!!plansForDay[hour]){
            let temp = {...editableFloorPlan};
            Object.keys(temp).forEach((key) =>{
                temp[key] = plansForDay[hour][key];
            })
            setEditableFloorPlan(temp);
            let opt = {...optional};
            Object.keys(opt).forEach((key) => {
                opt[key] = plansForDay[hour][key];
            }) 
        }
    }, [hour, plansForDay])
    const handleAssignmentChange = (e) => {
        let temp = {...editableFloorPlan}; 
        temp[e.target.id].name = e.target.value;
        setEditableFloorPlan(temp);
    }
    const handleOptionsChange = (e) => {
        let temp = {...optional};
        temp[e.target.id].name = e.target.value;
        setOptions(temp);
    }
    const optTitle = (e) => {
        let temp = {...optional};
        temp[e.target.id].title = e.target.value;
        setOptions(temp);
    }
    const handleCheck = (e) => {
        let temp = {...editableFloorPlan};
        temp[e.target.id].training = !temp[e.target.id].training;
        setEditableFloorPlan(temp);
    }
    const updateTrainee = (e) => {
        let temp = {...editableFloorPlan};
        temp[e.target.id].trainee = e.target.value;
        setEditableFloorPlan(temp);

    }
    const selectDay = (e) => {
        let temp = e.target.value;
        setSelectedDate(temp);
        
    }
    const selectTime = (e) => {
        setHour(e.target.value);
    }
    const saveFloorPlan = async () => {
        if(selectedDate === null || hour === '') {
            alert('Select a valid day and time');
            return;
        }
        let temp = {...editableFloorPlan, ...optional};
        await addFloorPLan(temp, selectedDate, hour);
    }
    const generatePDF = () => {
        if(selectedDate === null || hour === '') {
            alert('Select a valid day and time');
            return;
        }
        let temp = {...editableFloorPlan, ...optional};
        setPDFPlan(temp);
        setPDF(true);
    }
    const closeStyle = {
        position: 'absolute',
        right: '20px'
    }
    return (
        <div>
            { pdf ? <PDF close={setPDF} date={selectedDate} time={hour} plan={pdfPlan}/> : 
            <Card style={{overflowY:'scroll'}}>
                <p onClick={close} style={closeStyle}>X</p>
                <Card.Title>Create Floor Plan</Card.Title>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={12} sm={6}>
                            <div style={{display: 'inline-flex'}}>
                                <h6 style={{paddingTop: '8px', paddingBottom: '-8px', paddingRight: '10px'}}> Date </h6>
                                <input type='date' value={selectedDate} onChange={selectDay} />
                            </div>
                            </Col>
                            <Col xs={12} sm={6}>
                            <div style={{display: 'inline-flex'}}>
                                <h6 style={{paddingTop: '8px', paddingBottom: '-8px', paddingRight: '10px'}}> Times </h6>
                                <select value={hour} onChange={selectTime}>
                                    {hours.map((h) => (<option key={h} value={h}>{h}</option>))}
                                </select>
                            </div>
                            </Col>
                        </Row>
                        {Object.keys(editableFloorPlan).map((position) =>
                            (<Row style={{marginTop: '4px'}}>
                                <Col xs={12} sm={6} md={3}>
                                    <h6 style={{maxWidth:'100%', paddingTop: '4px', paddingBottom: '-4px'}}>{editableFloorPlan[position].title}</h6>
                                </Col>
                                <Col xs={12} sm={6} md={3}>
                                    <select style={{maxWidth:'100%'}} onChange={handleAssignmentChange} value={editableFloorPlan[position].name} id={position}>
                                        { floorList.map((person) => (<option key={person} value={person} >{person}</option>))}
                                    </select>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div style={{display:'inline-flex'}}>
                                        <label for='training' style={{marginRight: '5px'}}>Training</label>
                                        <input name='training' id={position} type='checkbox' value={editableFloorPlan[position].training} style={{marginRight: '5px'}} onChange={handleCheck}/>
                                        { editableFloorPlan[position].training && <input id={position} type="text" value={editableFloorPlan[position].trainee} onChange={updateTrainee} placeholder='Trainee Name'
                                        style={{marginRight: '5px', border: '1px solid black', borderRadius: '6px'}}/>}
                                    </div>
                                    
                                </Col>
                            </Row>)
                        )}
                        <Row style={{marginTop: '4px'}}>
                            <Col xs={12} sm={6}>
                                <div style={{display:'inline-flex'}}>
                                    <h6 style={{paddingTop: '4px', paddingBottom: '-4px', paddingRight: '6px'}}>OPTIONAL</h6>
                                    <input type='text' style={{border: '1px solid black', borderRadius: '6px'}} value={options.optional1.title} placeholder='ie WASH' id='optional1' onChange={optTitle}/>
                                </div>
                            </Col>
                            <Col xs={12} sm={6}>
                            <select style={{maxWidth:'100%'}} onChange={handleOptionsChange} value={options.optional1.name} id='optional1'>
                                        { floorList.map((person) => (<option key={person} value={person}>{person}</option>))}
                                    </select>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '4px'}}>
                            <Col xs={12} sm={6}>
                                <div style={{display:'inline-flex'}}>
                                    <h6 style={{paddingTop: '4px', paddingBottom: '-4px', paddingRight: '6px'}}>OPTIONAL</h6>
                                    <input type='text' style={{border: '1px solid black', borderRadius: '6px'}} value={options.optional2.title} placeholder='ie BACKROOM' id='optional2' onChange={optTitle}/>
                                </div>
                            </Col>
                            <Col xs={12} sm={6}>
                            <select style={{maxWidth:'100%'}} onChange={handleOptionsChange} value={options.optional2.name} id='optional2'>
                                        { floorList.map((person) => (<option key={person} value={person}>{person}</option>))}
                                    </select>
                            </Col>
                        </Row>
                    </Container>
                    
                </Card.Body>
                <div style={{display:'inline-flex', marginBottom: '20px'}}>
                    <Button style={{margin: 'auto'}} onClick={saveFloorPlan}>Save Floor Plan</Button>
                    <Button style={{margin: 'auto'}} onClick={generatePDF}>Generate PDF</Button>
                </div>
                
            </Card>
            }
        </div>
    )
} 

export default CreateFloorPlan;