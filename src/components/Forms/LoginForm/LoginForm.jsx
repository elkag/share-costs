import React from 'react';

//styles
import styles from './login-form.module.css';
import FormLayout from '../FormLayout/FormLayout';
import TextInput from '../InputFields/TextInput';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import useSubmitButtonStyles from '../submitButtonStyles';


const LoginForm = ({onSubmit, isLoading, error}) => {

    const classes = useSubmitButtonStyles();
    const success = React.useState(!isLoading);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
      });

    // Credentials data
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

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
                  disabled={isLoading}
                  type="text"
                  value={username}
                  inputName="username" 
                  title="Username" 
                  placeholder="Your username.."
                  onChange={ onChangeUsername } />
                <TextInput 
                  id="password" 
                  disabled={isLoading}
                  type="password"
                  value={password}
                  inputName="password" 
                  title="Password" 
                  placeholder="Your password.."
                  onChange={ onChangePassword } />
                <div className={styles.error}>{error}</div>
                <div className={styles["button-wrapper"]} >
                    <Button
                        variant="contained"
                        color="primary"
                        className={buttonClassname}
                        disabled={isLoading}
                        onClick={onSubmitLogin}
                        >
                        Login
                        </Button>
                        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </FormLayout>
    )
}

export default LoginForm;