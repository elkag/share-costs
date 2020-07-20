import React from 'react';

export const USER_SESSION_DEFAULT_VALUE = {
    session: {},
    setUser: () => {
    },
};

const UserSessionContext = React.createContext( USER_SESSION_DEFAULT_VALUE);

export default UserSessionContext;