import React, {useCallback, useEffect, useState} from 'react';
import {EditContact} from "../Components/EditContact";
import {AddContact} from "../Components/AddContact";


export const ContactsPage = () => {

    const bodyRef = React.createRef()
    const [showEditPage, setShowEditPage] = useState(false)
    const [showAddPage, setShowAddPage] = useState(false)
    const [indexToEdit, setIndexToEdit] = useState(0)
    const [selectedContact, setSelectedContact] = useState({})
    const [qw, setqw] = useState({})
    const [contacts, setContacts] = useState([
        {name: "Вася", phone: "+7921456371"},
        {name: "Коля", phone: "+7976456131"},
        {name: "Петя", phone: "+7836450971"},
        {name: "Вова", phone: "+7965450981"},
        {name: "Гоша", phone: "+7123456121"},
        {name: "Рома", phone: "+7543256361"},
        {name: "Саша", phone: "+7923478371"},
        {name: "Леня", phone: "+7786220971"},
        {name: "Петр", phone: "+7932426431"},
        {name: "Женя", phone: "+7870823471"},
    ])


    const closeEditModal = () =>{
        setShowEditPage(false)
    }

    const closeAddModal = () =>{
        setShowAddPage(false)
    }

    // useEffect(()=>{
    //     return()=>{
    //         localStorage.setItem("contacts", JSON.stringify(
    //             {contacts: contacts}));
    //     }
    // },[])

    useEffect(()=>{
        const people = JSON.parse(localStorage.getItem("contacts"))
        if(people){
            setContacts(people)
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("contacts", JSON.stringify(contacts));
    },[contacts])







    const renderHead = () => {
        return (
            <thead>
            <tr>
                <th>Имя</th>
                <th>Телефон</th>
            </tr>
            </thead>
        );
    }

    const deleteElement = (index, name) =>{
        console.log(contacts[index])
        const newArray = [...contacts]
        newArray.splice(index,1)
        setContacts(newArray)
    }

    const editElement = (selectedContact, index) =>{
        setShowEditPage(true)
        setSelectedContact((selectedContact))
        setIndexToEdit(index)
    }

    const addElement = () =>{
        setShowAddPage(true)

    }

    const saveNewPerson = (newName, newPhone) =>{
        let name = ''
        let phone = ''

        if(typeof newName === 'undefined'){
            name = contacts[indexToEdit].name
        }else{
            name = newName
        }

        if(typeof newPhone === 'undefined'){
            phone = contacts[indexToEdit].phone
        }else{
            phone = newPhone
        }


        console.log(newName, newPhone)
        const newArray = [...contacts]
        newArray[indexToEdit] = {name: name, phone: phone}
        setContacts(newArray)
        console.log(newArray[indexToEdit])

    }

    const addNewPerson = (name, phone) => {
        console.log(name, phone)
        const newArray = [...contacts]
        newArray.unshift({name: name, phone: phone})
        setContacts(newArray)
    }

    const renderBody = useCallback( ()=> {
        const array = []

        contacts.forEach((people,index) => array.push(
            <tr key = {index}>
                <td>{people.name}</td>
                <td>{people.phone}</td>
                <td className="my_td">
                    <div className="image_holder" onClick={()=>deleteElement(index)}>
                        <img style={{height: "30px"}} src="/system-images/cart.png" alt=""/>
                    </div>
                    <div className="image_holder" onClick={()=>editElement(people, index)}>
                        <img style={{height: "30px"}} src="/system-images/edite.png" alt=""/>
                    </div>
                </td>
            </tr>
        ))
        return (array)
    }, [contacts])

    return (
        <div className="white_body">
            <div className="button" style={{marginLeft: "20px", marginTop: "20px"}} onClick={()=>addElement()}>Добавить контакт</div>
        <div className="table">
            {showEditPage && <EditContact
                showPage = {showEditPage}
                closeModal = {closeEditModal}
                contact = {selectedContact}
                saveNewPerson = {saveNewPerson}
            />}
            {showAddPage && <AddContact
                showPage = {showEditPage}
                closeModal = {closeAddModal}
                contact = {selectedContact}
                addNewPerson = {addNewPerson}
            />}
            <table cellSpacing="0" cellPadding="0">
                {renderHead()}
                <tbody ref={bodyRef}>
                {renderBody()}
                </tbody>
            </table>
        </div>
        </div>
    )
}