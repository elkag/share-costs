import React, { useEffect, Fragment } from 'react';
import { UserContext } from '../../contexts/userContext';
import { Redirect } from 'react-router-dom';
import { HOME_PAGE } from '../../config/routes';
import { getGroupsApi } from '../../api/services/getGroupsApi';
import GroupList from '../../components/Groups/GroupList';
import MessageSnackbar from '../../components/Snackbar/MessageSnackbar';
import PageBackdrop from '../../components/PageBackdrop/PageBackdrop';
import { SERVER_ERROR } from '../../config/systemMessages';

const MyGroupsPage = () => {

  const [session] = React.useContext(UserContext);
  const [groups, setGroups] = React.useState(null);
  const [loading, setLoading] = React.useState(true); 
  const [error, setError] = React.useState('');
  const isMountedComponent = React.useRef(true);

  const getGroups = async () => {
    const responce = await getGroupsApi.getGroups();
    setLoading(false);
    if(responce.error){
      setError(SERVER_ERROR);
    } else {
      setGroups(responce);
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

  useEffect( () => {
    console.log(error)

  },[error])
  const renderElements = () => {

    return (
      <Fragment>
        <PageBackdrop isLoading={loading} />
        {!loading && <GroupList groups={groups} />}
        {error !== '' && <MessageSnackbar message={error}/>}
      </Fragment>
    )
   
  }
  
  return (
    (!session || !session.user) ? <Redirect to={HOME_PAGE} /> :
      renderElements()
    );
  }


export default MyGroupsPage;