import React from 'react';
import { UserContext } from '../../contexts/userContext';
import { useHistory } from 'react-router-dom';
import { MY_GROUPS_PAGE } from '../../config/routes';

const HomePage = () => {

  const [session] = React.useContext(UserContext);
  const history = useHistory()

  return (
        <div>
          {session && session.user && history.push(MY_GROUPS_PAGE)}
        </div>
  );
}

export default HomePage;