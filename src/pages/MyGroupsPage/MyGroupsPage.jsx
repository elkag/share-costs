import React, { useEffect, Fragment } from 'react';
import { UserContext } from '../../contexts/userContext';
import { Redirect } from 'react-router-dom';
import { getGroupsApi } from '../../api/services/getGroupsApi';
import { SERVER_ERROR } from '../../config/systemMessages';
import { HOME_PAGE } from '../../config/routes';
import Loader from '../../components/common/Loader';
import GroupList from '../../components/GroupList/GroupList'

const MyGroupsPage = () => {

  const [session] = React.useContext(UserContext);
  const [groups, setGroups] = React.useState(null);
  const [loading, setLoading] = React.useState(true); 
  const [error, setError] = React.useState('');
  const isMountedComponent = React.useRef(true);

  const getGroups = async () => {
    const response = await getGroupsApi.getGroups();
    setLoading(false);
    if(response.error){
      setError(SERVER_ERROR);
    } else {
      setGroups(response);
    }
  }

  useEffect( () => {
    if (isMountedComponent.current) {
      getGroups();
    }
    
    return () => {
      isMountedComponent.current = false;
    }

  },[])

  const renderElements = () => {

    return (
      <Fragment>
        <Loader loading={loading} error={error} />
        <GroupList groups={groups} />
      </Fragment>
    )
   
  }
  
  return (
    (!session || !session.user) ? <Redirect to={HOME_PAGE} /> :
      renderElements()
    );
  }


export default MyGroupsPage;