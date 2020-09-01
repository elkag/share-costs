import React from 'react';
// Components
import FormLayout from '../FormLayout/FormLayout';
import EmailInputField from '../InputFields/EmailInput';
import TextInput from '../InputFields/TextInput';
//styles
import CircularProgress from '@material-ui/core/CircularProgress';
import UsernameInput from '../InputFields/UsernameInput';
import StyledButton from '../../common/StyledButton';
import { makeStyles } from '@material-ui/core';
import { textsRed } from '../../../styles/colors';

const useStyles = makeStyles((theme) => ({
    fields: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flexGrow: 1
    },
    title: {
        display: 'flex',
        justifyContent: 'left',
        paddingBottom:20
    },
    error: {
        height:'20px',
        color: textsRed,
        fontSize: 'small', 
        display: 'flex',
        justifyContent: 'flex-start',
        paddingTop: '5px',
        paddingLeft: '5px'
    }
}));

const RegisterForm = ({onSubmit, isLoading, error}) => {

    const classes = useStyles(makeStyles);

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

    const checkData = () => {
        // All fields are initialized    
        const initialized = ( emailFieldInitialized && firstNameFieldInitialized && 
                                          lastNameFieldInitialized && usernameFieldInitialized && 
                                          passwordFieldInitialized && repasswordFieldInitialized ) 
        // All fields have correct values                               
        const correctInitialized = !emailError && !firstNameError && !lastNameError && 
                                    !usernameError && !passwordError && !repasswordError


        return true;//initialized && correctInitialized;
    }

    return (
        <FormLayout>
            <div className={classes.title}>
                <h3>Create an account</h3>
            </div>
            <div className={classes.fields}>
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
                    required={true} />
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
            </div>
            <div className={classes.error}>{error}</div>
            <StyledButton>
                Register
            </StyledButton>
            {isLoading && <CircularProgress size={24}/>}
        </FormLayout>
    )
}

export default RegisterForm;