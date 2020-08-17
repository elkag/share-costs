import React from 'react';

//styles
import FormLayout from '../FormLayout/FormLayout';
import TextInput from '../InputFields/TextInput';
import StyledButton from '../../common/StyledButton';
import { makeStyles } from '@material-ui/core';
import { textsRed } from '../../../styles/colors';

const useStyles = makeStyles((theme) => ({
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
const LoginForm = ({onSubmit, isLoading, error}) => {

    const success = React.useState(!isLoading);
    const classes = useStyles(makeStyles);
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
                    testid='login_uname'
                    id="username" 
                    disabled={isLoading}
                    type="text"
                    value={username}
                    inputName="username" 
                    title="Username" 
                    placeholder="Your username.."
                    onChange={ onChangeUsername } />
                <TextInput 
                    testid='login-pass'
                    id="password" 
                    disabled={isLoading}
                    type="password"
                    value={password}
                    inputName="password" 
                    title="Password" 
                    placeholder="Your password.."
                    onChange={ onChangePassword } />
                <div data-testid='login-error' className={classes.error}>{error}</div>
                    <StyledButton
                        onClick={onSubmitLogin}
                        disabled={isLoading}
                        >
                        Login
                    </StyledButton>
            </FormLayout>
    )
}

export default LoginForm;