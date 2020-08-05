import React from 'react';
// config
import { setSessionCookie, getSessionCookie } from '../../config/session';
import { HOME_PAGE, REGISER_PAGE } from '../../config/routes';
// context
import { UserContext } from '../../contexts/userContext';
// API
import { loginApi } from '../../api/services/loginApi';
//components
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  pageWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize:'11pt',
  },
  infoText: {
    paddingTop: '20px'
  },
  link: {
    color: blue[600],
    display: "block",
    margin: "0.5em 0",
    fontFamily: "Helvetica, Arial, sans-serif",
    textDecoration: "none",
  
    "&:hover": {
      textDecoration: "underline",
    },
    "&.active": {
      color: "blue",
      textDecoration: "none",
    }
  }
}
));

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
        
        const responce = await loginApi.logIn(username, password);
        
        if(responce.error) {
            setError(responce.message)
        } else {
          setSession( {user: responce.user} );
          setSessionCookie(responce);
          console.log(getSessionCookie("session"));
          props.history.push(HOME_PAGE);
        }
        setLoading(false);
      }

    return (
      <div className={classes.pageWrapper}>
        <LoginForm onSubmit={logIn} isLoading={loading} error={error}/>
        <div className={classes.infoText}>You have not account yet?</div>
        <Link to={REGISER_PAGE} className={classes.link}>Click here to create one</Link>
      </div>
    )
}

export default LoginPage;