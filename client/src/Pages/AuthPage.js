import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../Hooks/http.hook";
import {useMessage} from "../Hooks/message.hook";
import {AuthContext} from "../Context/AuthContext";
import {useHistory} from "react-router-dom"

export const AuthPage = () =>{
    const auth = useContext(AuthContext)
    const history = useHistory();
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(()=>{
        message(error)
        clearError()
    },[error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    },[])


    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () =>{
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        }catch (e) {}
    }

    const loginHandler = async () =>{
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            message(data.message)
            if(data){
                history.push("/contacts")
            }
        }catch (e) {}
    }


    return (
        <div className="cart_holder">
            <div className="register_card">
                <h1>Сократи ссылку</h1>
                <div className="card white darken-1">
                    <div className="card-content white-text">
                        <span className="card_title">Авторизация</span>
                       <div>
                           <div className="input-field">
                               <input
                                   placeholder="Введие Email"
                                   id="email"
                                   type="text"
                                   name="email"
                                   value={form.email}
                                   onChange={changeHandler}
                                   />
                                   <label htmlFor="email">Email</label>
                           </div>
                           <div className="input-field">
                               <input
                                   placeholder="Введие пароль"
                                   id="password"
                                   type="password"
                                   name="password"
                                   value={form.password}
                                   onChange={changeHandler}
                               />
                               <label htmlFor="password">Пароль</label>
                           </div>

                       </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="button"
                            onClick={loginHandler}
                            style={{marginRight: 10}}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className="button"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
            </div>
    )
}