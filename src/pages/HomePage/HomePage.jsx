import React from 'react';
import { UserContext } from '../../contexts/userContext';

const HomePage = () => {

    const [session] = React.useContext(UserContext);

  return (
      <div>{session.user && session.user.id ? "User: " + session.user.username : "Unauthorized"}</div>
  );
}

export default HomePage;