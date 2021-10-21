import React, {useEffect, useState} from "react";

export const AddContact = ({closeModal, addNewPerson}) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [verification, setVerification] = useState(false)

    useEffect(() => {
        return()=>{
            setName('')
            setPhone('')
        }
    }, [])

    useEffect(() => {
        if(name.length > 3 && phone.length >= 11){
            setVerification(true)
        }
    }, [name,phone])

    const savePerson = () => {
        addNewPerson(name, phone)
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
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                </div>
                <div>
                    <label htmlFor="phone">Телефон</label>
                    <input
                        placeholder="Телефон"
                        id="phone"
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>

                {verification
                    ? <button
                    className="button"
                    onClick={savePerson}
                    style={{marginRight: 10}}
                >
                    Добавить контакт
                </button> :
                    <button
                        className="button disabled"
                        style={{marginRight: 10}}
                    >
                        Добавить контакт
                    </button>
                }

                {!verification && <div className="ahtung_text">Имя должно быть больше 3 символов <br/> Телефон должен быть больше 10 символов</div>}

            </div>
        </div>
    )
}