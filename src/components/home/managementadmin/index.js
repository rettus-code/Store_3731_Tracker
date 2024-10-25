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
                        <Button variant="outline-dark" size='sm' onClick={addNewManager}>Submit</Button>
                    </Container>
                </Card.Body>
            </Card>
            <Card className='text-lg font-normal pt-14' style={{width: '96%', ['max-width']: '800px', margin: 'auto'}}>
                <Card.Title>Modify or Delete a Manager</Card.Title>
            </Card>
        </div>
    )
}

export default ManagementAdmin;