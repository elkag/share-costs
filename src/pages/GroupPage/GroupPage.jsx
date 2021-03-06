import React, { useEffect, useCallback } from 'react';
import { UserContext } from '../../contexts/userContext';
import { HOME_PAGE, LOGIN_PAGE } from '../../config/routes';
import { Redirect, useParams } from 'react-router-dom';
import { getGroupApi } from '../../api/services/getGroupApi';
import GroupView from '../../components/GroupView/GroupView';
import Loader from '../../components/common/Loader';
import { joinGroupApi } from '../../api/services/joinGroupApi';
import { removePendingUserApi } from '../../api/services/removePendingUserApi';
import { addUserToGroupApi } from '../../api/services/addUserToGroupApi';

export const GroupContext = React.createContext();

const GroupPage = () => {

  const [session] = React.useContext(UserContext);
  const [group, setGroup] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true); 
  
  const params = useParams();

  const getGroup = useCallback(async () => {
    setLoading(true);
    const response = await getGroupApi.getGroup(params.groupId);
    setLoading(false)
    if(response.error){
      setError(response.message);
    } else {
      setGroup(response);
    }
    
    setLoading(false);
  }, [ setGroup, params.groupId])

  useEffect( () => {
    getGroup();
  },[getGroup])

   /**
     * @param {*} userId
     */
    const addToGroup = async (userId) => {
      setLoading(true);
      const response = await addUserToGroupApi.addUser(group.id, userId);
      setLoading(false);
      if(response.error){
          setError(response.message);
      } else {
          setGroup(response);
      }
  }

  const removePendingUser = async (user) => {
      setLoading(true);
      const response = await removePendingUserApi.removeUser(group.id, user.id);
      setLoading(false);
      if(response.error){
        setError(response.message);
      } else {
        setGroup(response);
      }
      
  }

  const joinGroup = async () => {
      setLoading(true);
      const response = await joinGroupApi.join(group.id);
      setLoading(false);
      if(response.error){
        setError(response.message);
      } else {
        setGroup(response);
      }
      
  }

  const render = () => {
    if(session && session.loading) {
      return null;
    }

    if(session && session.user) {
        return <GroupContext.Provider value={{group, getGroup}}>
                  <Loader loading={loading} error={error} />
                  <GroupView 
                      joinGroup={joinGroup} 
                      addToGroup={addToGroup} 
                      removePendingUser={removePendingUser} />
              </GroupContext.Provider>
    }

    return <Redirect to={LOGIN_PAGE} />
  }
  return (
    render()
  );
}

export default GroupPage;