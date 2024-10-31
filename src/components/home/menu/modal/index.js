import React, { useEffect, useState } from 'react';
import CreateFloorPlan from '../createfloorplan';
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
        { page === 'createFloorPlan' && <CreateFloorPlan closePage={closePage}/>}
        { page === 'editCrew' && <CrewEdit closePage={closePage}/>}
    </div>)
}

export default Modal;