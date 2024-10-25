import React, { useEffect, useState } from 'react'
import { addManager, updateManager, deleteManager, getAllManagers } from '../../../firebase/firestore';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const ManagementAdmin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('manager');
    const [managersList, setManagersList] = useState([]);
    const [currentManager, setCurrentManager] = useState({});
    const [nameToEdit, setNameToEdit] = useState('');
    const [emailToEdit, setEmailToEdit] = useState('');
    const [roleToEdit, setRoleToEdit] = useState('');

    const roles = ['manager', 'admin', 'senior'];

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const addNewManager = async () => {
        //build manager object
        let temp = {
            name: name,
            email: email,
            role: role
        }
        //send to firestore db
        const validate = await addManager(temp);
        console.log(validate);
        //reset form
        setName('');
        setEmail('');
        setRole('manager');
    }
    const changeCurrentManager= (event)=> {
        setCurrentManager(managersList.filter((manager) => manager.name === event.target.value)[0]);
    }
    const prepareCurrentManagerForUpdate = () => {
        console.log(currentManager);
    }
    //effects
    useEffect(() =>{
        const getList = async () => {
            let list = await getAllManagers();
            setManagersList(list.sort((a,b) => a?.name.localeCompare(b?.name)));
        }
        getList();
    }, []);
    useEffect(() =>{
        setCurrentManager(managersList[0]);
    }, [managersList])
    //styling
    const inputStyle = {
        width: '60%',
        ['min-width']: '200px',
        border: '2px solid black',
        margin: '2px 37% 2px 0'
    }
    return (
        <div>
            <Card className='text-lg font-normal pt-14' style={{width: '96%', ['max-width']: '800px', margin: 'auto'}}>
                <Card.Title>Add a new manager</Card.Title>
                <Card.Body >
                    <Container fluid>
                        <Row>
                            <Col xs={3} md={4} className='text-right'>Name:</Col>
                            <Col xs={9} md={8} >
                                <input type='text' style={inputStyle} onChange={handleNameChange} placeholder='First Last' value={name}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3} md={4} className='text-right'>Email:</Col>
                            <Col xs={9} md={8}>
                                <input type='email' style={inputStyle} onChange={handleEmailChange} value={email}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3} md={4} className='text-right'>Role:</Col>
                            <Col xs={9} md={8}>
                                <select style={inputStyle} onChange={handleRoleChange}>
                                    { roles.map((r) => (<option key={r} value={role}>{role}</option>))}
                                </select>
                            </Col>
                        </Row>
                        <Button style={{marginTop: '12px'}} variant="outline-dark" size='sm' onClick={addNewManager}>Submit</Button>
                    </Container>
                </Card.Body>
            </Card>
            <Card className='text-lg font-normal pt-14' style={{width: '96%', ['max-width']: '800px', margin: 'auto'}}>
                <Card.Title>Modify or Delete a Manager</Card.Title>
                
                <Container>
                    <Row>
                        <Col xs={12} sm={3} lg={4} style={{marginBottom: '30px'}}>
                            <Card.Text>Pick a Manager to Edit</Card.Text>
                            <select style={{...inputStyle, margin: 'auto'}} onChange={changeCurrentManager}>
                                { managersList.map((manager) => (<option key={manager?.name} value={manager?.name}>{manager?.name}</option>))}
                            </select><br></br>
                            <Button style={{marginTop: '12px'}} variant="outline-dark" size='sm' onClick={prepareCurrentManagerForUpdate}>Select</Button>
                        </Col>
                        <Col xs={12} sm={9} lg={8}>
                            <Row>
                                <Col xs={3} md={4} className='text-right'>Name:</Col>
                                <Col xs={9} md={8} >
                                    <input type='text' style={inputStyle} onChange={handleNameChange} placeholder='First Last' value={nameToEdit}></input>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={3} md={4} className='text-right'>Email:</Col>
                                <Col xs={9} md={8}>
                                    <input type='email' style={inputStyle} onChange={handleEmailChange} value={emailToEdit}></input>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={3} md={4} className='text-right'>Role:</Col>
                                <Col xs={9} md={8}>
                                    <select style={inputStyle} onChange={handleRoleChange}>
                                        { roles.map((r) => (<option key={r} value={roleToEdit}>{roleToEdit}</option>))}
                                    </select>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                
            </Card>
        </div>
    )
}

export default ManagementAdmin;