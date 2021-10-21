import React, {useEffect, useState} from "react";

export const EditContact = ({showPage, closeModal, contact, saveNewPerson}) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        setName(contact.name)
        setPhone(contact.phone)
        window.M.updateTextFields()
        return()=>{
            setName('')
            setPhone('')
        }
    }, [])


    const savePerson = () => {
        saveNewPerson(name, phone)
        closeModal(true)
    }


    return (
        <div>
            <div className="edit_page_modal" onClick={() => closeModal()}></div>
            <div className="edit_page_form">
                <div>
                    <label htmlFor="name">Имя</label>
                    <input
                        placeholder="Имя"
                        id="name"
                        type="text"
                        defaultValue={contact.name}
                        onChange={e => setName(e.target.value)}
                    />

                </div>
                <div>
                    <label htmlFor="phone">Телефон</label>
                    <input
                        placeholder="Телефон"
                        id="phone"
                        type="text"
                        defaultValue={contact.phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>

                <button
                    className="button"
                    onClick={savePerson}
                    style={{marginRight: 10}}
                >
                    ИЗМЕНИТЬ
                </button>
            </div>
        </div>
    )
}