import React, { useEffect, Fragment } from 'react';
import { UserSessionContext } from '../../contexts/userContext';
import { Redirect } from 'react-router-dom';
import { HOME_PAGE } from '../../config/routes';
import { getGroupsApi } from '../../api/shareCostsBackend/getGroupsApi';
import GroupList from '../../components/Groups/GroupList';
import { CircularProgress, Backdrop, makeStyles } from '@material-ui/core';
import MessageSnackbar from '../../components/Snackbar/MessageSnackbar';

/**
 * {
    "id": "2b45ade7-5298-4d2f-925c-518e8a8bbeac",
    "name": "My group",
    "owner": {
        "id": "f619bdce-b6d2-40d4-8300-18e7405d1989",
        "username": "elka",
        "password": null,
        "firstName": "ELKA",
        "lastName": "GANEVA",
        "email": "elka.ganeva@gmail.com",
        "balance": 8.13
    },
    "date": "2020-07-31T14:50:23.028+0000",
    "status": "new",
    "balance": 16.25,
    "description": "My first group test description",
    "users": [
        {
            "id": "f619bdce-b6d2-40d4-8300-18e7405d1989",
            "username": "elka",
            "password": null,
            "firstName": "ELKA",
            "lastName": "GANEVA",
            "email": "elka.ganeva@gmail.com",
            "balance": 8.13
        },
        {
            "id": "68104d72-bde7-44f6-a99e-da6f271ffd1b",
            "username": "bobo",
            "password": null,
            "firstName": "Borislav",
            "lastName": "Momchilov",
            "email": "borislav@gmail.com",
            "balance": -8.13
        }
    ],
    "pendingUsers": []
}
 */

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MyGroupsPage = () => {

  const classes = useStyles();

  const [session] = React.useContext(UserSessionContext);
  const [groups, setGroups] = React.useState(null);
  const [loading, setLoading] = React.useState(true); 
  const [error, setError] = React.useState('');
  const isMountedComponent = React.useRef(true);

  const getGroups = async () => {
    const responce = await getGroupsApi.getGroups();
    setLoading(false);
    if(responce.error){
      setError("Server error. Try again later");
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
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <GroupList groups={groups} />
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