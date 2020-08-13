import React from 'react';
// config
import { setSessionCookie, getSessionCookie } from '../../config/session';
import { HOME_PAGE, REGISTER_PAGE } from '../../config/routes';
// context
import { UserContext } from '../../contexts/userContext';
// API
import { loginApi } from '../../api/services/loginApi';
//components
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  pageWrapper: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
  },
  infoText: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '20px',
    justifyContent: 'center'
  },
  link: {
    color: blue[600],
    margin: "0.5em 0",
    textAlign: 'center',
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      textAlign: 'center'
    },
    "&.active": {
      color: "blue",
      textDecoration: "none",
    }
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
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles(makeStyles);
    // Sends requested data to BE
    // Log user if sussess
    // Saves user's session in a cookie and context
    const logIn = async (username, password) => {
        setLoading(true);
        setError(false);
        
        const response = await loginApi.logIn(username, password);
        
        if(response.error) {
            setError(response.message)
        } else {
          setSession( {user: response.user} );
          setSessionCookie(response);
          console.log(getSessionCookie("session"));
          props.history.push(HOME_PAGE);
        }
        setLoading(false);
      }

    return (
      <div className={classes.pageWrapper}>
        <LoginForm onSubmit={logIn} isLoading={loading} error={error}/>
        <div className={classes.infoText}>
          You have not account yet?
        </div>
        <Link to={REGISTER_PAGE} className={classes.link}>Click here to create one</Link>
      </div>
    )
}

export default LoginPage;