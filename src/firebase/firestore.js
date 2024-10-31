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
export const addCrewMember = async (data) => {
    const docRef = await addDoc(collection(db, "crew"), {
        name: data.name, //required
        minorStatus: data.minorStatus //required
    })
    return "Document written with ID: " + docRef.id;
}
//delete crew member
export const deleteCrewMember = async (id) => {
    await deleteDoc(doc(db, "crew", id));
    return `Deleted ${id} document`
}
//update crew member
export const updateCrewMember = async (data, id) => {
    const docRef = await setDoc(doc(db, 'crew', id), { ...data });
    return "Document update with ID: " + id;
}
//get crew list
export const getAllCrewMembers = async () => {
    let crewList = [];
    const querySnapshot = await getDocs(collection(db, "crew"));
    querySnapshot.forEach((doc) => {
        let temp = {
            id: doc.id,
            name: doc.data().name,
            minorStatus: doc.data().minorStatus,
        }
        crewList.push(temp);
    })
    return crewList;
}
//get crew and manager list
export const getCrewAndManagers = async () => {
    const crewList = await getAllCrewMembers();
    const managerList = await getAllManagers();
    let fullList = [];
    crewList.forEach((crew) => fullList.push(crew.name));
    managerList.forEach((manager) => fullList.push(manager.name))
    return fullList;
}
//add floor plan
export const addFloorPLan = async (data, day, time) => {
    const docRef = await setDoc(doc(db, 'floorplans', day), { [time]: {...data}});
    return "Document created with ID: " + day;
}
//update floor plan

//delete floor plan

//get floor plans by date
export const getFloorPlansForDate = async (date) => {
    const docRef = doc(db, 'floorplans', date);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists) {
        return {
            date : docSnap.id,
            dailyPlans : docSnap.data()
        }
    } else {
        return 'No plans for that day'
    }
}
//get floor plans by date span

//add oepe form

//delete oepe form

//update oepe form

//get oepe by date

//get oepe by date span