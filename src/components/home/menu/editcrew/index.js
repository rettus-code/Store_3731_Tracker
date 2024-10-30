import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { addCrewMember, deleteCrewMember, updateCrewMember, getAllCrewMembers } from '../../../../firebase/firestore';

const CrewEdit = ({closePage}) => {
    const close = async () => {
        console.log("close")
        closePage(false)
    }
    const [name, setName] = useState('');
    const [minorStatus, setMinorStatus] = useState('false');
    const minorStatuses = ['true', 'false'];
    const [crewList, setCrewList] = useState([]);
    const [currentCrew, setCurrentCrew] = useState({});
    const [nameToEdit, setNameToEdit] = useState('');
    const [minorStatusToEdit, setMinorStatusToEdit] = useState('false');
    const [idForEdit, setIdForEdit] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleStatusChange = (event) => {
        setMinorStatus(event.target.value);
    };
    const handleNameToEditChange = (event) => {
        setNameToEdit(event.target.value);
    };
    const handleMinorStatusToEditChange = (event) => {
        setMinorStatusToEdit(event.target.value);
    };
    const addNewCrew = async () => {
        //build manager object
        let temp = {
            name: name,
            minorStatus: minorStatus
        }
        //send to firestore db
        await addCrewMember(temp);
        const list = await getAllCrewMembers();
            setCrewList(list.sort((a,b) => a?.name.localeCompare(b?.name)));
            console.log(crewList);
            setCurrentCrew(crewList[0]);
        //reset form
        setName('');
        setMinorStatus('false');
    }
    const changeCurrentCrew= (event)=> {
        setCurrentCrew(crewList.filter((crew) => crew.name === event.target.value)[0]);
    }
    const prepareCurrentCrewForUpdate = () => {
        console.log(currentCrew);
        setNameToEdit(currentCrew.name);
        setMinorStatusToEdit(currentCrew.minorStatus);
        setIdForEdit(currentCrew.id);
    }
    const updateCrewRequest = async () => {
        let temp = {
            name: nameToEdit,
            minorStatus: minorStatusToEdit
        }
        const verify = await updateCrewMember(temp, idForEdit);
        console.log(verify);
        resetUpdateFormAndList();
    }
    const deleteCrewRequest = async () => {
        const verify = await deleteCrewMember(idForEdit);
        console.log(verify);
        resetUpdateFormAndList();
    }
    const resetUpdateFormAndList = async () => {
        let list = await getAllCrewMembers();
        setCrewList(list.sort((a,b) => a?.name.localeCompare(b?.name)));
        setNameToEdit('');
        setMinorStatusToEdit('false');
        setIdForEdit('');
        setCurrentCrew(crewList[0]);
    }
    useEffect(() =>{
        const getCrew = async () => {
            const list = await getAllCrewMembers();
            setCrewList(list.sort((a,b) => a?.name.localeCompare(b?.name)));
            console.log(crewList);
            setCurrentCrew(crewList[0]);
        }
        getCrew();
    }, [])
    const closeStyle = {
        position: 'absolute',
        right: '20px'
    }
    const inputStyle = {
        width: '60%',
        'minWidth': '200px',
        border: '2px solid black',
        margin: '2px 37% 2px 0'
    }
    return (
    <div>
        <Card>
            <p onClick={close} style={closeStyle}>X</p>
            <Card.Title>Add New Crew Member</Card.Title>
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs={3} md={4} className='text-right'>Name:</Col>
                        <Col xs={9} md={8} >
                            <input type='text' style={inputStyle} onChange={handleNameChange} placeholder='First Last' value={name}></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3} md={4} className='text-right'>Minor Status:</Col>
                        <Col xs={9} md={8}>
                            <select style={inputStyle} onChange={handleStatusChange} value={minorStatus}>
                                { minorStatuses.map((s) => (<option key={s} value={s}>{s}</option>))}
                            </select>
                        </Col>
                    </Row>
                    <Button style={{marginTop: '12px'}} variant="outline-dark" size='sm' onClick={addNewCrew}>Submit</Button>
                </Container>
            </Card.Body>
        </Card>
        <Card className='text-lg font-normal pt-14' style={{width: '100%', 'maxWidth': '800px', margin: 'auto'}}>
                <Card.Title>Modify or Delete a Crew Member</Card.Title>
                
                <Container>
                    <Row>
                        <Col xs={12} sm={3} lg={4} style={{marginBottom: '30px'}}>
                            <Card.Text>Pick a Crew Member to Edit</Card.Text>
                            <select style={{...inputStyle, margin: 'auto'}} onChange={changeCurrentCrew} >
                                { crewList.map((crew) => (<option key={crew?.name} value={crew?.name}>{crew?.name}</option>))}
                            </select><br></br>
                            <Button style={{marginTop: '12px'}} variant="outline-dark" size='sm' onClick={prepareCurrentCrewForUpdate}>Select</Button>
                        </Col>
                        <Col xs={12} sm={9} lg={8}>
                            <Row>
                                <Col xs={3} md={4} className='text-right'>Name:</Col>
                                <Col xs={9} md={8} >
                                    <input type='text' style={inputStyle} onChange={handleNameToEditChange} placeholder='First Last' value={nameToEdit}></input>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={3} md={4} className='text-right'>Minor Status:</Col>
                                <Col xs={9} md={8}>
                                    <select style={inputStyle} onChange={handleMinorStatusToEditChange} value={minorStatusToEdit}>
                                        { minorStatuses.map((s) => (<option key={s} value={s}>{s}</option>))}
                                    </select>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={3} sm={4}></Col>
                                <Col xs={2}>
                                    <Button variant="outline-success" onClick={updateCrewRequest}>Update</Button>
                                </Col>
                                <Col xs={2} sm={1}></Col>
                                <Col xs={2}>
                                    <Button variant="outline-danger" onClick={deleteCrewRequest}>Delete</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                
            </Card>
    </div>
    )
}

export default CrewEdit;