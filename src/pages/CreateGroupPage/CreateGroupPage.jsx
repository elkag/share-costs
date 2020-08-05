import React from 'react';
import { UserContext } from '../../contexts/userContext';
import { HOME_PAGE } from '../../config/routes';
import { Redirect } from 'react-router-dom';

const CreateGroupPage = () => {

  const [session] = React.useContext(UserContext);
  
  return (
    (!session || !session.user) ? <Redirect to={HOME_PAGE} /> :
      <div>Create Group Page</div>
  );
}

export default CreateGroupPage;