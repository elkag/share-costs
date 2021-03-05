import React, { useEffect, Fragment, useCallback } from 'react';
import { UserContext } from '../../contexts/userContext';
import { Redirect } from 'react-router-dom';
import { getGroupsApi } from '../../api/services/getGroupsApi';
import { HOME_PAGE, LOGIN_PAGE } from '../../config/routes';
import Loader from '../../components/common/Loader';
import GroupList from '../../components/GroupList/GroupList'

const MyGroupsPage = () => {

  const [session] = React.useContext(UserContext);
  const [groups, setGroups] = React.useState(null);
  const [loading, setLoading] = React.useState(true); 
  const [error, setError] = React.useState('');

  const getGroups = useCallback(async () => {
    const response = await getGroupsApi.getGroups();
    setLoading(false);
    if(response.error){
      setError(response.message);
    } else {
      setGroups(response);
    }
  }, [ setGroups])

  useEffect( () => {
    getGroups();
  },[getGroups])

  const renderElements = () => {
    if(session && session.loading) {
      return null;
    }

    if(session && session.user) {
        return <Fragment>
                <Loader loading={loading} error={error} />
                <GroupList groups={groups} />
              </Fragment>
    } 
    return (
      <Redirect to={LOGIN_PAGE} />
    )
   
  }
  
  return ( renderElements() )
  }


export default MyGroupsPage;