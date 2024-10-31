import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const PDF = ({close, date, time, plan}) => {
    const closePage = async () => {
        close(false)
    }
    const printDocument = () => {
        const input = document.getElementById('pdfDom');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          })
        ;
      }
    console.log(date, time, plan)
    const closeStyle = {
        position: 'absolute',
        right: '20px'
    }

    return (<div>
        
        <Card>
            <p onClick={closePage} style={closeStyle}>X</p>
            <Container id="pdfDom">
                <Row style={{backgroundColor: 'lightGrey', border: '2px solid black'}}>
                    <Col xs={2}>
                        <img src={require('./grimace2.png')} />
                    </Col>
                    <Col  xs={5} >
                        <Card.Title className='text-left' style={{fontSize: '1.1vw'}}>Time {time}</Card.Title>
                    </Col>
                    <Col  xs={3}>
                        <Card.Title className='text-right' style={{fontSize: '1.1vw'}}>Date {date}</Card.Title>
                    </Col>
                </Row>
                <Row style={{marginTop: '16px'}}>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightBlue', border:'1px solid black', fontSize: '.83vw'}}>DT CASH</h6>
                        <h6 style={{borderBottom: '1px solid black', fontSize: '.83vw'}}>{plan.dtCash.name ? plan.dtCash.name : 'None'}</h6>
                    </Col>
                    <Col xs={3} style={{borderRight: '2px solid black'}}>
                        
                    </Col>
                    <Col xs={3} style={{borderLeft: '2px solid black'}}>
                        <h6 style={{backgroundColor: '#FFD700', border:'1px solid black', fontSize: '.83vw'}}>GRILL MANAGER</h6>
                        <h6 style={{borderBottom: '1px solid black', fontSize: '.83vw'}}>{plan.grillManager.name ? plan.grillManager.name : 'None'}</h6>
                    </Col>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightCyan', border:'1px solid black', fontSize: '.83vw'}}>MEATS/4:1</h6>
                        <h6 style={{borderBottom: '1px solid black', fontSize: '.83vw'}}>{plan.meats1.name ? plan.meats1.name : 'None'}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '16px'}}>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightGrey', border:'1px solid black', fontSize: '.83vw'}}>{plan.optional1.title}</h6>
                        <h6 style={{borderBottom: '1px solid black', fontSize: '.83vw'}}>{plan.optional1.name ? plan.optional1.name : 'None'}</h6>
                    </Col>
                    <Col xs={3} style={{borderRight: '2px solid black'}}>
                        
                    </Col>
                    <Col xs={3} style={{borderLeft: '2px solid black'}}>
                        
                    </Col>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightCyan', border:'1px solid black', fontSize: '.83vw'}}>MEATS/10:1</h6>
                        <h6 style={{borderBottom: '1px solid black', fontSize: '.83vw'}}>{plan.meats2.name ? plan.meats2.name : 'None'}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '16px'}}>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightGrey', border:'1px solid black', fontSize: '.83vw'}}>{plan.optional2.title}</h6>
                        <h6 style={{borderBottom: '1px solid black', fontSize: '.83vw'}}>{plan.optional2.name ? plan.optional2.name : 'None'}</h6>
                    </Col>
                    <Col xs={3} style={{borderRight: '2px solid black'}}>
                        <h6 style={{backgroundColor: 'lightCyan', border:'1px solid black', fontSize: '.83vw'}}>S2 - FINISH</h6>
                        <h6 style={{borderBottom: '1px solid black', fontSize: '.83vw'}}>{plan.s2Finish.name ? plan.s2Finish.name : 'None'}</h6>
                    </Col>
                    <Col xs={3} style={{borderLeft: '2px solid black'}}>
                        <h6 style={{backgroundColor: 'lightCyan', border:'1px solid black', fontSize: '.83vw'}}>S1 - FINISH</h6>
                        <h6 style={{borderBottom: '1px solid black', fontSize: '.83vw'}}>{plan.s1Finish.name ? plan.s1Finish.name : 'None'}</h6>
                    </Col>
                    <Col xs={3}>
                        
                    </Col>
                </Row>
                <Row style={{marginTop: '16px'}}>
                    <Col xs={3}>
                        
                    </Col>
                    <Col xs={3} style={{borderRight: '2px solid black'}}>
                        
                    </Col>
                    <Col xs={3} style={{borderLeft: '2px solid black'}}>
                        
                    </Col>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightCyan', border:'1px solid black', fontSize: '.83vw'}}>BACKWALL</h6>
                        <h6 style={{borderBottom: '1px solid black', fontSize: '.83vw'}}>{plan.backWall.name ? plan.backWall.name : 'None'}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '16px'}}>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightBlue', border:'1px solid black'}}>FRIES/HASH</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.friesHash.name ? plan.friesHash.name : 'None'}</h6>
                    </Col>
                    <Col xs={3} style={{borderRight: '2px solid black'}}>
                        <h6 style={{backgroundColor: 'lightCyan', border:'1px solid black'}}>S2 - INITIATE</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.s2Initiate.name ? plan.s2Initiate.name : 'None'}</h6>
                    </Col>
                    <Col xs={3} style={{borderLeft: '2px solid black'}}>
                        <h6 style={{backgroundColor: 'lightCyan', border:'1px solid black'}}>S1 - INITIATE</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.s2Initiate.name ? plan.s2Initiate.name : 'None'}</h6>
                    </Col>
                    <Col xs={3}>
                        
                    </Col>
                </Row>
                <Row style={{marginTop: '16px'}}>
                    <Col xs={3}>

                    </Col>
                    <Col xs={3} style={{borderRight: '2px solid black', borderBottom: '2px solid black'}}>
                        <h6 style={{color: 'white'}}>S2 - INITIATE</h6>
                    </Col>
                    <Col xs={3} style={{borderLeft: '2px solid black', borderBottom: '2px solid black'}}>
                        <h6 style={{color: 'white'}}>S1 - INITIATE</h6>
                    </Col>
                    <Col xs={3}>
                        
                    </Col>
                </Row>
                <Row style={{marginTop: '16px'}}>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightBlue', border:'1px solid black'}}>Present</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.present.name ? plan.present.name : 'None'}</h6>
                    </Col>
                    <Col xs={3} style={{borderTop: '2px solid black'}}>
                        <h6 style={{backgroundColor: 'lightCyan', border:'1px solid black'}}>DT RUN</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.dtRunner.name ? plan.dtRunner.name : 'None'}</h6>
                    </Col>
                    <Col xs={3} style={{borderTop: '2px solid black'}}>
                        <h6 style={{backgroundColor: 'lightBlue', border:'1px solid black'}}>FC RUN</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.fcRunner.name ? plan.fcRunner.name : 'None'}</h6>
                    </Col>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightBlue', border:'1px solid black'}}>DELIVERY</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.delivery.name ? plan.delivery.name : 'None'}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '16px'}}>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightBlue', border:'1px solid black'}}>DTOT1</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.dtOT1.name ? plan.dtOT1.name : 'None'}</h6>
                    </Col>
                    <Col xs={6} >
                        <h6 style={{backgroundColor: '#FFD700', border:'1px solid black', width:'50%', margin:'auto'}}>FLOOR MANAGER</h6>
                        <h6 style={{borderBottom: '1px solid black', width:'50%', margin:'8px auto'}}>{plan.floorManager.name ? plan.floorManager.name : 'None'}</h6>
                    </Col>
                    
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightBlue', border:'1px solid black'}}>DIGITAL AMB</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.digitalAmb.name ? plan.digitalAmb.name : 'None'}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '16px'}}>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightBlue', border:'1px solid black'}}>DTOT2</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.dtOT2.name ? plan.dtOT2.name : 'None'}</h6>
                    </Col>
                    <Col xs={3} >
                        <h6 style={{backgroundColor: 'lightBlue', border:'1px solid black'}}>EXPO</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.expo.name ? plan.expo.name : 'None'}</h6>
                    </Col>
                    <Col xs={3} >
                        <h6 style={{backgroundColor: 'lightBlue', border:'1px solid black'}}>CURB</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.curb.name ? plan.curb.name : 'None'}</h6>
                    </Col>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightGrey', border:'1px solid black'}}>BREAKER</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.breaker.name ? plan.breaker.name : 'None'}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '16px'}}>
                    <Col xs={3}>
                        <h6 style={{backgroundColor: 'lightBlue', border:'1px solid black'}}>BDAP</h6>
                        <h6 style={{borderBottom: '1px solid black'}}>{plan.bdap.name ? plan.bdap.name : 'None'}</h6>
                    </Col>
                    <Col xs={3} >
                        
                    </Col>
                    <Col xs={3} >
                        
                    </Col>
                    <Col xs={3}>
                        
                    </Col>
                </Row>
            </Container>
            <Button onClick={printDocument}>Download PDF</Button>
        </Card>
    </div>)
}

export default PDF;