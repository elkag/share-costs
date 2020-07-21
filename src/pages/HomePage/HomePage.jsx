import React from 'react';
import { UserSessionContext } from '../../contexts/userContext';

const HomePage = () => {

    const [session] = React.useContext(UserSessionContext);

    return (
            (<div>{session.user && session.user.id ? "User: " + session.user.username : "Unauthorized"}</div>)
    )
}

export default HomePage;