import React, { useEffect, Fragment, useCallback } from 'react';
import { UserContext } from '../../contexts/userContext';
import { HOME_PAGE } from '../../config/routes';
import { Redirect, useParams } from 'react-router-dom';
import { getGroupApi } from '../../api/services/getGroupApi';
import { SERVER_ERROR } from '../../config/systemMessages';
import GroupView from '../../components/GroupView/GroupView';
import Loader from '../../components/common/Loader';

export const GroupContext = React.createContext();

const GroupPage = () => {

  const [session] = React.useContext(UserContext);
  const [group, setGroup] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true); 
  
  const params = useParams();

  const getGroup = useCallback(async () => {
    const response = await getGroupApi.getGroup(params.groupId);
    if(response.error){
      setError(SERVER_ERROR);
    } else {
      setGroup(response);
    }
    
    setLoading(false);
  }, [ setGroup, params.groupId])

  useEffect( () => {
    getGroup();
  },[getGroup])

  return (
    (!session || !session.user) ? <Redirect to={HOME_PAGE} /> :
    <GroupContext.Provider value={{group, getGroup}}>
        <Loader loading={loading} error={error} />
        {!loading && <GroupView />}
    </GroupContext.Provider>
  );
}

export default GroupPage;