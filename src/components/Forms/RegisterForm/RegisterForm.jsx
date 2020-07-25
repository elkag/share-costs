import React from 'react';

// Components
import FormLayout from '../FormLayout/FormLayout';
import EmailInputField from '../InputFields/EmailInput';
import TextInput from '../InputFields/TextInput';
import SubmitButton from '../SubmitButton/SubmitButton';

//styles
import styles from './register-form.module.css';


const RegisterForm = ({onSubmit}) => {

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

    const checkData = () => {
        // All fields are initialized    
        const initialized = ( emailFieldInitialized && firstNameFieldInitialized && 
                                          lastNameFieldInitialized && usernameFieldInitialized && 
                                          passwordFieldInitialized && repasswordFieldInitialized ) 
        // All fields have correct values                               
        const correctInitialized = !emailError && !firstNameError && !lastNameError && 
                                    !usernameError && !passwordError && !repasswordError

        return initialized && correctInitialized;
    }

    const onSubmitRegistration = () => {
        if(checkData()) {
            onSubmit(email, firstName, lastName, password, username);
        }
    }

    return (
        <FormLayout>
            <div className={styles.header}>Sign Up</div>
            <EmailInputField 
                id="email"
                value={email}
                onChange={onChangeEmail} 
                inputName="email" 
                title="Email" 
                placeholder="Your email.." 
                required={true}
                error={emailError}
                />
            <TextInput 
                id="fname" 
                value={firstName}
                type="text" 
                inputName="fname" 
                title="First name" 
                placeholder="Your first name.." 
                onChange={onChangeFirstName} 
                required={true} />
            <TextInput 
                id="lname" 
                value={lastName}
                type="text" 
                inputName="lname" 
                title="Last name" 
                placeholder="Your last name.." 
                onChange={onChangeLastName} 
                required={true} />
            <TextInput 
                id="username" 
                value={username}
                type="text" 
                inputName="username" 
                title="Username" 
                placeholder="Your username.." 
                onChange={onChangeUsername} 
                required={true} />
            <TextInput 
                id="password" 
                value={password}
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
                compare={password}
                type="password" 
                inputName="repassword" 
                title="Retype password" 
                placeholder="Type your password again ..." 
                onChange={onChangeRePassword} 
                required={true} />

            <div className={styles.error}>{emailFieldInitialized && emailError ? "error" : null}</div>
            <SubmitButton 
                title="Submit" 
                disabled={ !checkData() } 
                onSubmit={onSubmitRegistration} />
        </FormLayout>
    )
}

export default RegisterForm;