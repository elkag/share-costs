import React from 'react';
// config
import { setSessionCookie, getSessionCookie } from '../../config/session';
// context
import { UserSessionContext } from '../../contexts/userContext';
// API
import { loginApi } from '../../api/shareCostsBackend/loginApi';
// components
import InputField from '../../components/Form/InputField/InputField';
import FormLayout from '../../components/Form/FormLayout/FormLayout';
import SubmitButton from '../../components/Form/SubmitButton/SubmitButton';
import { HOME_PAGE } from '../../config/routes';
//styles
import styles from './login-page.module.css';

const LoginPage = (props) => {
  
    // User session
    const [setSession] = React.useContext(UserSessionContext);

    // Credentials data
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    // Sends requested data to BE
    // Log user if sussess
    // Saves user's session in a cookie and context
    const logIn = async () => {
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

   /**
    * @param {any} event 
    */
    const onSubmit = async (event) => {
        event.preventDefault();
        if( checkCredentials() ) {
            logIn();
        }
    };

    const checkCredentials = () => {
          if( !username || username === "") {
              setError("Username can ot be empty..");
              return false;
          }

          if( !password || password === "") {
              setError("Password can ot be empty..");
              return false;
          }
          return true;
    }

    // set username
    const onChangeUsername = (e) => {
      e.preventDefault();
      setUsername(e.target.value);
    }

    // set password
    const onChangePassword = (e) => {
      e.preventDefault();
      setPassword(e.target.value);
    }

    return (
            <FormLayout>
                <InputField 
                  id="username" 
                  type="text"
                  inputName="username" 
                  title="Username" 
                  placeholder="Your username.."
                  onChange={ onChangeUsername } />
                <InputField 
                  id="password" 
                  type="password"
                  inputName="password" 
                  title="Password" 
                  placeholder="Your password.."
                  onChange={ onChangePassword } />
                <span className={styles.error}>{error}</span>
                <SubmitButton 
                  title="Login"  
                  onSubmit={onSubmit} />
            </FormLayout>
    )
}

export default LoginPage;