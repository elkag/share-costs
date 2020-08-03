import React from 'react';
import { UserSessionContext } from '../../contexts/userContext';
import { HOME_PAGE } from '../../config/routes';
import { Redirect } from 'react-router-dom';

const CreateGroupPage = () => {

  const [session] = React.useContext(UserSessionContext);
  
  return (
    (!session || !session.user) ? <Redirect to={HOME_PAGE} /> :
      <div>Create Group Page</div>
  );
}

export default CreateGroupPage;