import React, { useEffect, Fragment } from 'react';
import { UserContext } from '../../contexts/userContext';
import { HOME_PAGE } from '../../config/routes';
import { Redirect, useParams } from 'react-router-dom';
import GroupView from '../../components/Groups/GroupView';
import { getGroupApi } from '../../api/services/getGroupApi';
import PageBackdrop from '../PageBackdrop/PageBackdrop';
import { SERVER_ERROR } from '../../config/systemMessages';
import MessageSnackbar from '../../components/Snackbar/MessageSnackbar';


const GroupPage = ({groupId}) => {

  const [session] = React.useContext(UserContext);
  const [group, setGroup] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true); 
  const params = useParams();

  const getGroup = async () => {
    const responce = await getGroupApi.getGroup(params.groupId);
    if(responce.error){
      setError(SERVER_ERROR);
    } else {
      setGroup(responce);
    }
    
    setLoading(false);
  }
  
  useEffect( () => {
    getGroup();
  },[])

  return (
    (!session || !session.user) ? <Redirect to={HOME_PAGE} /> :
     <Fragment>
        <PageBackdrop isLoading={loading} />
        {!loading && <GroupView group={group} />}
        {error !== '' && <MessageSnackbar message={error}/>}
     </Fragment>
  );
}

export default GroupPage;