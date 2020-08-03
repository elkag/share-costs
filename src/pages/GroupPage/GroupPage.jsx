import React, { useEffect } from 'react';
import { UserSessionContext } from '../../contexts/userContext';
import { HOME_PAGE } from '../../config/routes';
import { Redirect, useParams } from 'react-router-dom';
import GroupView from '../../components/Groups/GroupView';
import { getGroupApi } from '../../api/shareCostsBackend/getGroupApi';


const GroupPage = ({groupId}) => {

  const [session] = React.useContext(UserSessionContext);
  const [group, setGroups] = React.useState(null);
  const params = useParams();

  const getGroup = async () => {
    const responce = await getGroupApi.getGroup(params.groupId);
    setGroups(responce);
  }
  
  useEffect( () => {
    getGroup();
  },[])
  
  

  
  return (
    (!session || !session.user) ? <Redirect to={HOME_PAGE} /> :
     <GroupView group={group}></GroupView>
  );
}

export default GroupPage;