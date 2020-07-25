import React from 'react';
// config
import { setSessionCookie, getSessionCookie } from '../../config/session';
import { HOME_PAGE } from '../../config/routes';
// context
import { UserSessionContext } from '../../contexts/userContext';
// API
import { loginApi } from '../../api/shareCostsBackend/loginApi';
//components
import LoginForm from '../../components/Forms/LoginForm/LoginForm';



const LoginPage = (props) => {
  
    // User session
    const [session, setSession] = React.useContext(UserSessionContext);
    const [error, setError] = React.useState(false);

    // Sends requested data to BE
    // Log user if sussess
    // Saves user's session in a cookie and context
    const logIn = async (username, password) => {
        const sesionDetails = await loginApi.logIn(username, password);
        if(sesionDetails.error) {
            setError(sesionDetails.message)
        } else {
          setSession( {user: sesionDetails.user} );
          setSessionCookie(sesionDetails);
          console.log(getSessionCookie("session"));
          props.history.push(HOME_PAGE);
        }
      }

    return (
        <LoginForm onSubmit={logIn} />
    )
}

export default LoginPage;