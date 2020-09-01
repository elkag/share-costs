import React from 'react';

//styles
import FormLayout from '../FormLayout/FormLayout';
import TextInput from '../InputFields/TextInput';
import StyledButton from '../../common/StyledButton';
import { makeStyles, Divider, Button } from '@material-ui/core';
import { textsRed, mainGreen } from '../../../styles/colors';
import { REGISTER_PAGE } from '../../../config/routes';
import { FACEBOOK_AUTH_URL } from '../../../api/services/config/config';

import googleLogo from '../../../resources/img/google-logo.png';
import facebookLogo from '../../../resources/img/fb-logo.png';

const useStyles = makeStyles((theme) => ({
    titleRow: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 40
    },
    title: {
        fontWeight: 'bold'
    },
    error: {
        height:'20px',
        color: textsRed,
        fontSize: 'small', 
        display: 'flex',
        justifyContent: 'flex-start',
        paddingTop: '5px',
        paddingLeft: '5px'
    },
    infoText: {
        width: '100%',
        textAlign: 'center',
        paddingTop: '20px',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    link: {
        color: mainGreen,
        textAlign: 'center',
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
            textAlign: 'center'
        },
        "&.active": {
            color: "blue",
            textDecoration: "none",
        }
    },
    bottom: {
        paddingTop: 10,
    },
    btnFacebook: {
        float: 'middle',
        verticalAlign: 'middle',
        textAlign: 'left',
        width: 180,
        height: 26,
        borderRadius: '4px',
        background: '#3b5998',
        color:'white',
        border:'0px transparent', 
        display: 'inline-block',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: '10pt'
    },
    btnGoogle: {
        verticalAlign: 'middle',
        textAlign: 'left',
        width: 180,
        height: 26,
        borderRadius: '4px',
        background: 'white',
        color:'grey',
        border:'1px solid', 
        borderColor: 'grey',
        margin:'5px',
        display: 'inline-block',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: '10pt'
    },
    logoImage: {
        width: 30,
        height: 30
    },
    divider: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 10
    },
    loginButtonWrapper: {
        display: 'flex',
        justifyContent: 'center',
    }
}));
const LoginForm = ({onSubmit, isLoading, error}) => {

    const classes = useStyles(makeStyles);
    // Credentials data
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    // set username
    const onChangeUsername = (value, error) => {
        setUsername(value);
    }

    // set password
     const onChangePassword = (value, error) => {
        setPassword(value);
    }

    const checkData = () => {
       return true;
    }

    const onSubmitLogin = () => {
        if(checkData()) {
            onSubmit(username, password)
        }
    }

    return (
            <FormLayout>
                <div className={classes.titleRow}>
                    <div className={classes.title}>Sign in</div>
                    <div><a className={classes.link} href={REGISTER_PAGE}>or create an account</a></div>
                </div>
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
                <div className={classes.loginButtonWrapper}>
                    <StyledButton
                        onClick={onSubmitLogin}
                        disabled={isLoading}
                        >
                        Login
                    </StyledButton>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.divider}>
                        <div style={{width: '40%'}}><Divider/></div>
                        <div>or</div>
                        <div style={{width: '40%'}}><Divider/></div>
                    </div>
                    <div className={classes.socialButtonsWrapper}>
                    <Button className={classes.btnGoogle} href={FACEBOOK_AUTH_URL}>
                        <img className={classes.logoImage} src={googleLogo} alt="Google" /> 
                        Log in with Google
                    </Button>
                    <Button className={classes.btnFacebook} href={FACEBOOK_AUTH_URL}>
                        <img className={classes.logoImage} src={facebookLogo} alt="Facebook" /> 
                        Log in with Facebook
                    </Button>
                    </div>
                </div>
            </FormLayout>
    )
}

export default LoginForm;