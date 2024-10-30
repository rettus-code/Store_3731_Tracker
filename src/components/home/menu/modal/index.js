import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CrewEdit from '../editcrew';

const Modal = ({closePage, page}) => {
    const modalStyle = {
        zIndex: '20',
        position: 'absolute',
        top: '0',
        width: '100%',
        overflow: 'auto'
    }
    return (<div style={modalStyle}>
        
        <CrewEdit closePage={closePage}/>
    </div>)
}

export default Modal;