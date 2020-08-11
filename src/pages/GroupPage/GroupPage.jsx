import React, { useEffect, Fragment } from 'react';
import { UserContext } from '../../contexts/userContext';
import { HOME_PAGE } from '../../config/routes';
import { Redirect, useParams } from 'react-router-dom';
import { getGroupApi } from '../../api/services/getGroupApi';
import { SERVER_ERROR } from '../../config/systemMessages';
import GroupView from '../../components/GroupView/GroupView';
import Loader from '../../components/common/Loader';


const GroupPage = ({groupId}) => {

  const [session] = React.useContext(UserContext);
  const [group, setGroup] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true); 
  const params = useParams();

  const getGroup = async () => {
    const response = await getGroupApi.getGroup(params.groupId);
    if(response.error){
      setError(SERVER_ERROR);
    } else {
      setGroup(response);
    }
    
    setLoading(false);
  }
  
  useEffect( () => {
    getGroup();
  },[])

  return (
    (!session || !session.user) ? <Redirect to={HOME_PAGE} /> :
     <Fragment>
        <Loader loading={loading} isError={error !== ''} message={error} />
        {!loading && <GroupView group={group} />}
     </Fragment>
  );
}

export default GroupPage;