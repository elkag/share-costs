import React, { useState, createContext } from 'react';
import { getSessionCookie } from '../config/session';

export const UserSessionContext = createContext();

export const UserSessionProvider = (props) => {

    const [session, setSession] = useState({
        user: getSessionCookie("session").user,
    });
    
    return(
        <UserSessionContext.Provider value={[session, setSession]}>
            {props.children}
        </UserSessionContext.Provider>
    );
}