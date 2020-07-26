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
    const [loading, setLoading] = React.useState(false);

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
        <LoginForm onSubmit={logIn} isLoading={loading} error={error}/>
    )
}

export default LoginPage;