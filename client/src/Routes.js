import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {ContactsPage} from "./Pages/ContactsPage";
import {AuthPage} from "./Pages/AuthPage";


export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/contacts" exact><ContactsPage /> </Route>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/" />
        </Switch>
    )

}