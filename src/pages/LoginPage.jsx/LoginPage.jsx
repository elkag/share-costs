import React from 'react';
// config
import { setSessionCookie } from '../../config/session';
import { HOME_PAGE } from '../../config/routes';
// context
import { UserContext } from '../../contexts/userContext';
// API
import { loginApi } from '../../api/services/loginApi';
//components
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { bgColor } from '../../styles/colors';

const useStyles = makeStyles(theme => ({
  pageWrapper: {
      width: '100%',
      height: 'calc(100vh - 90px)',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: "center",
      backgroundColor: bgColor
  },
  
  error: {
    width: '100%',
    textAlign: 'center',
    color: red[600],
    fontSize: "small" 
  }
}));

const LoginPage = (props) => {
  
    // User session
    const [, setSession] = React.useContext(UserContext);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles(makeStyles);
    // Sends requested data to BE
    // Log user if success
    // Saves user's session in a cookie and context
    const logIn = async (username, password) => {
        setLoading(true);
        setError(false);
        
        const response = await loginApi.logIn(username, password);
        
        if(response.error) {
            setError(response.errorMessage)
        } else {
          setSession( {user: response.user} );
          setSessionCookie(response);
          props.history.push(HOME_PAGE);
        }
        setLoading(false);
      }

    return (
      <div className={classes.pageWrapper}>
        <LoginForm onSubmit={logIn} isLoading={loading} error={error}/>
      </div>
    )
}

export default LoginPage;