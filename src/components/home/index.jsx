import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { getAllManagers } from '../../firebase/firestore'
import ManagersListToRegisterEmail from "./managerslisttoregistermail"
import ManagementAdmin from "./managementadmin";
import Menu from "./menu"
const Home = () => {
    const [managersList, setManagersList] = useState([]);
    const [currentManager, setCurrentManager] = useState({});
    const { currentUser } = useAuth()

    useEffect(() =>{
        const getList = async () => {
            let list = await getAllManagers();
            setManagersList(list);
        }
        getList();
    }, []);

    
    useEffect(() =>{
        if(managersList.length > 0) {
            managersList.forEach((manager) => {
                if(currentUser.email === manager.email){
                    setCurrentManager(manager);
                }
            })
        }
    }, [managersList])

    useEffect(() => {
        
    }, [currentManager]);

    const menuString = "Choose Your Action From the menu";
    const registerEmail = "Your email is not associated to a user please choose your name from the list";
    return (
        <div className='text-2xl font-bold pt-14 text-center'>
            <h2>Hello {currentManager.name ? currentManager.name : currentUser.email}, you are now logged in.</h2>
            <p className='text-lg font-normal pt-10'>{ currentManager.email ? menuString : registerEmail}</p>
            {
                currentManager.email ? <Menu /> : <ManagersListToRegisterEmail managers={ managersList } email={ currentUser.email }manager={ setCurrentManager } />
            }
            <br></br>
            {
                currentManager?.role === "senior" || currentManager.role === "admin" ? <ManagementAdmin /> : ""
            }
            
        </div>
    )
}

export default Home