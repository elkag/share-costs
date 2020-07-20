import React from 'react';
import UserSessionContext from '../../contexts/userContext';

const HomePage = () => {

    const userSessionContext = React.useContext(UserSessionContext);

    return (
            (<div>{userSessionContext.session && userSessionContext.session.user ? "User: " + userSessionContext.session.user.username : "Unauthorized"}</div>)
    )
}

export default HomePage;