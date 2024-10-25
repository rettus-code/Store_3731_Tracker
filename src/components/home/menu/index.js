import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Menu = () => {


    return (<div>
        <Card className='text-lg font-normal pt-14' style={{width: '96%', 'maxWidth': '800px', margin: 'auto'}}>
            <Card.Title>Action Menu</Card.Title>
            <Card.Body>
                <Container>
                    <Row>
                        <Card.Text>Floor Plans</Card.Text>
                        <Col>
                            <Button>Create Floor Plan</Button>
                        </Col>
                        <Col>
                            <Button>Edit Floor Plan</Button>
                        </Col>
                        <Col>
                            <Button>Download all by Date</Button>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '15px' }}>
                        <Card.Text>OEPE</Card.Text>
                        <Col>
                            <Button>Submit OEPE</Button>
                        </Col>
                        <Col>
                            <Button>Edit OEPE</Button>
                        </Col>
                        <Col>
                            <Button>Download OEPE by Date</Button>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '15px' }}>
                        <Card.Text>Admin</Card.Text>
                        <Col>
                            <Button>Edit Crew List</Button>
                        </Col>
                        <Col>
                            <Button>Crew Stats</Button>
                        </Col>
                        <Col>
                            
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    </div>)
}

export default Menu;