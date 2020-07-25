import React from 'react';

// components
//styles
import styles from './login-form.module.css';
import FormLayout from '../FormLayout/FormLayout';
import TextInput from '../InputFields/TextInput';
import SubmitButton from '../SubmitButton/SubmitButton';

const LoginForm = ({onSubmit}) => {

    // Credentials data
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    // input fields initialization state
    const [usernameFieldInitialized, setUsernameFieldInitialized] = React.useState( false );
    const [passwordFieldInitialized, setPasswordFieldInitialized] = React.useState( false );

    // input data validation
    const [usernameError, setUsernameError] = React.useState( false );
    const [passwordError, setPasswordError] = React.useState( false );

    // set username
    const onChangeUsername = (value, error) => {
        if(!usernameFieldInitialized) {
            setUsernameFieldInitialized(true);
        }
        setUsernameError(error);
        setUsername(value);
    }

    const checkData = () => {
        // All fields are initialized    
        const initialized = usernameFieldInitialized && passwordFieldInitialized;
        // All fields have correct values                               
        const correctInitialized = !usernameError && !passwordError;

        return initialized && correctInitialized;
    }

    const onSubmitLogin = () => {
        if(checkData()) {
            onSubmit(username, password)
        }
    }

    // set password
    const onChangePassword = (value, error) => {
        if(!passwordFieldInitialized) {
            setPasswordFieldInitialized(true);
        }
        setPasswordError(error);
        setPassword(value);
    }

    return (
            <FormLayout>
                <TextInput 
                  id="username" 
                  type="text"
                  value={username}
                  inputName="username" 
                  title="Username" 
                  placeholder="Your username.."
                  onChange={ onChangeUsername } />
                <TextInput 
                  id="password" 
                  type="password"
                  value={password}
                  inputName="password" 
                  title="Password" 
                  placeholder="Your password.."
                  onChange={ onChangePassword } />
                <span className={styles.error}>{error}</span>
                <SubmitButton 
                  title="Login" 
                  disabled={!checkData()} 
                  onSubmit={onSubmitLogin} />
            </FormLayout>
    )
}

export default LoginForm;