import { db } from "./firebase";

import { 
    collection, 
    doc,
    addDoc, 
    getDoc, 
    getDocs, 
    setDoc, 
    updateDoc, 
    deleteDoc, 
    deleteField 
} from "firebase/firestore";

//add manager
export const addManager = async (data) => {
    const docRef = await addDoc(collection(db, "managers"), {
        email: data.email ? data.email : "", //optional
        name: data.name, //required
        role: data.role //required
    })
    return "Document written with ID: " + docRef.id;
}

//delete manager
export const deleteManager = async (id) => {
    await deleteDoc(doc(db, "managers", id));
    return `Deleted ${id} document`
}
//update manager

export const updateManager = async (data, id) => {
    const docRef = await setDoc(doc(db, 'managers', id), { ...data });
    return "Document update with ID: " + id;
}

//register email
export const registerEmailToManager = async (data, id) => {
    await updateDoc(doc(db, "managers", id), { ...data });
    return "Document update with ID: " + id;
}
//get manager list
export const getAllManagers = async () => {
    let managersList = [];
    const querySnapshot = await getDocs(collection(db, "managers"));
    querySnapshot.forEach((doc) => {
        let temp = {
            id: doc.id,
            name: doc.data().name,
            role: doc.data().role,
            email: doc.data().email ? doc.data().email : ""
        }
        managersList.push(temp);
    })
    return managersList;
}
//add crew member

//delete crew member

//update crew member

//get crew list

//add floor plan

//update floor plan

//delete floor plan

//get floor plans by date

//get floor plans by date span

//add oepe form

//delete oepe form

//update oepe form

//get oepe by date

//get oepe by date span