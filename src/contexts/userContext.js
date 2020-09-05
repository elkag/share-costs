import React, { useState, createContext } from 'react';
import { getSessionCookie } from '../config/session';

export const UserContext = createContext();

export const UserSessionProvider = (props) => {

    const [session, setSession] = useState({
        user: getSessionCookie("session"),
    });
    
    return(
        <UserContext.Provider value={[session, setSession]}>
            {props.children}
        </UserContext.Provider>
    );
}