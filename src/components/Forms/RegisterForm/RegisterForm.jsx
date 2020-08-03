import React from 'react';
// Components
import FormLayout from '../FormLayout/FormLayout';
import EmailInputField from '../InputFields/EmailInput';
import TextInput from '../InputFields/TextInput';
//styles
import styles from './register-form.module.css';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import useSubmitButtonStyles from '../submitButtonStyles';
import UsernameInput from '../InputFields/UsernameInput';
import { checkUsernameApi } from '../../../api/shareCostsBackend/checkUsernameApi';

const RegisterForm = ({onSubmit, isLoading, error}) => {

    const classes = useSubmitButtonStyles();
    const success = React.useState(!isLoading);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
      });

    // registration input data 
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repassword, setRepassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");

    // input fields initialization state
    const [emailFieldInitialized, setEmailFieldInitialized] = React.useState( false );
    const [usernameFieldInitialized, setUsernameFieldInitialized] = React.useState( false );
    const [firstNameFieldInitialized, setFirstNamedFieldInitialized] = React.useState( false );
    const [lastNameFieldInitialized, setLastNameFieldInitialized] = React.useState( false );
    const [passwordFieldInitialized, setPasswordFieldInitialized] = React.useState( false );
    const [repasswordFieldInitialized, setRepasswordFieldInitialized] = React.useState( false );

    // input data validation
    const [emailError, setEmailError] = React.useState( false );
    const [firstNameError, setFirstNameError] = React.useState( false );
    const [lastNameError, setLastNameError] = React.useState( false );
    const [usernameError, setUsernameError] = React.useState( false );
    const [passwordError, setPasswordError] = React.useState( false );
    const [repasswordError, setRepasswordError] = React.useState( false );

    // Username must be unique. On blur effect we ask BE if username is free for usage
    // usernameForbiddenError, usernameErrorMessage come from BE
    const [usernameForbiddenError, setUsernameForbiddenError] = React.useState( true );
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState( false );
    const [usernameCheckInProgress, setUsernameCheckInProgress] = React.useState( false );


    const onChangeEmail = (value, error) => {
        if(!emailFieldInitialized) {
            setEmailFieldInitialized(true);
        }
        setEmailError(error);
        setEmail(value);
    }

    const onChangeFirstName = (value, error) => {
        if(!firstNameFieldInitialized) {
            setFirstNamedFieldInitialized(true);
        }
        setFirstNameError(error);
        setFirstName(value);
    }

    const onChangeLastName = (value, error) => {
        if(!lastNameFieldInitialized) {
            setLastNameFieldInitialized(true);
        }
        setLastNameError(error);
        setLastName(value);
    }

    const onChangeUsername = (value, error) => {
        if(!usernameFieldInitialized) {
            setUsernameFieldInitialized(true);
        }
        setUsernameError(error);
        setUsername(value);
    }
    
    const onChangePassword = (value, error) => {
        if(!passwordFieldInitialized) {
            setPasswordFieldInitialized(true);
        }               
        setPasswordError(error);
        setPassword(value);
    }
    
    const onChangeRePassword = (value, error) => {
        if(!repasswordFieldInitialized) {
            setRepasswordFieldInitialized(true);
        } 
        
        setRepasswordError(error);
        setRepassword(value);
    }

    /**
     * Username validation
     * This method sends request to BE to see if the username is free
     * 
     * @param {String} aValue //username value
     */
     const checkUsername = async (event) => {
        setUsernameForbiddenError(true);
        setUsernameCheckInProgress(true);
        await checkUsernameApi.checkUsername(event.target.value)
                .then((response) => { 
                    if(response.error) {
                        setUsernameError(true);
                        setUsernameErrorMessage(response.message)
                    } else {
                        setUsernameForbiddenError(false)
                        setUsernameError(false);
                        setUsernameErrorMessage('')
                    }
                    setUsernameCheckInProgress(false);
                });
    }

    const checkData = () => {
        // All fields are initialized    
        const initialized = ( emailFieldInitialized && firstNameFieldInitialized && 
                                          lastNameFieldInitialized && usernameFieldInitialized && 
                                          passwordFieldInitialized && repasswordFieldInitialized ) 
        // All fields have correct values                               
        const correctInitialized = !emailError && !firstNameError && !lastNameError && 
                                    !usernameError && !passwordError && !repasswordError

        //Username is free 
        const usernameIsFree = usernameForbiddenError;

        return initialized && correctInitialized && !usernameIsFree;
    }

    const onSubmitRegistration = () => {
        if(checkData()) {
            onSubmit(email, firstName, lastName, password, username);
        }
    }

    return (
        <FormLayout>
            <div className={styles.header}>Create Account</div>
            <EmailInputField 
                id="email"
                value={email}
                onChange={onChangeEmail} 
                disabled={isLoading}
                inputName="email" 
                title="Email" 
                placeholder="Your email.." 
                required={true}
                error={emailError}
                />
            <TextInput 
                id="fname" 
                value={firstName}
                disabled={isLoading}
                type="text" 
                inputName="fname" 
                title="First name" 
                placeholder="Your first name.." 
                onChange={onChangeFirstName} 
                required={true} />
            <TextInput 
                id="lname" 
                value={lastName}
                disabled={isLoading}
                type="text" 
                inputName="lname" 
                title="Last name" 
                placeholder="Your last name.." 
                onChange={onChangeLastName} 
                required={true} />
            <UsernameInput 
                id="username" 
                value={username}
                disabled={isLoading || usernameCheckInProgress}
                error={usernameErrorMessage}
                type="text" 
                inputName="username" 
                title="Username" 
                placeholder="Your username.." 
                onChange={onChangeUsername} 
                onBlur={checkUsername}
                required={true} />
            <TextInput 
                id="password" 
                value={password}
                disabled={isLoading}
                compare={repassword}
                type="password" 
                inputName="password" 
                title="Password" 
                placeholder="Your password.." 
                onChange={onChangePassword} 
                required={true} />
            <TextInput 
                id="repassword" 
                value={repassword}
                disabled={isLoading}
                compare={password}
                type="password" 
                inputName="repassword" 
                title="Retype password" 
                placeholder="Type your password again ..." 
                onChange={onChangeRePassword} 
                required={true} />

            <div className={styles.error}>{error}</div>
            <div className={styles["button-wrapper"]} >
                    <Button
                        variant="contained"
                        color="primary"
                        className={buttonClassname}
                        disabled={isLoading || !checkData()}
                        onClick={onSubmitRegistration}
                        >
                        Login
                        </Button>
                        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
        </FormLayout>
    )
}

export default RegisterForm;