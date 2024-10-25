import React, { useState } from 'react'
import { registerEmailToManager } from '../../../firebase/firestore'

const ManagersListToRegisterEmail = ({ managers, email, manager }) => {
    const [selectedValue, setSelectedValue] = useState(managers[0]?.name);
    const handleSelection = async () => {
        let id = managers.filter((manager) => manager?.name === selectedValue)[0]?.id;
        let temp = {
            name: selectedValue,
            email: email,
            role: managers.filter((manager) => manager?.name === selectedValue)[0]?.role
        }
        manager({ id: id, ...temp })
        const verify = await registerEmailToManager(temp, id);
        console.log(verify);
    }
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const buttonStyle = {
        backgroundColor: "blue",
        color: "white",
        padding: "5px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    }

    const orderedManagers = managers.sort((a,b) => a?.name.localeCompare(b?.name));

    return (<div className='text-lg font-normal pt-10'>
        <select value={selectedValue} onChange={handleChange}>
            { orderedManagers.map((element, index) => (
                <option className='text-center' key={ index } value={element?.name}>{ element?.name } </option>
            ))}
        </select><br />
        <p>Who are you? Choose your name to link your email</p>
        <button style={buttonStyle} onClick={handleSelection}>Submit</button>
        </div>)
}

export default ManagersListToRegisterEmail