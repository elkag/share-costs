import React from 'react';
// Components
import InputField from '../../components/Form/InputField/InputField';
import FormLayout from '../../components/Form/FormLayout/FormLayout';
import SubmitButton from '../../components/Form/SubmitButton/SubmitButton';
// Config
import { setSessionCookie } from '../../config/session';
import { HOME_PAGE } from '../../config/routes';
// API
import { registerApi } from '../../api/shareCostsBackend/registerApi';
// Context
import UserSessionContext from '../../contexts/userContext';
//styles
import styles from './register-page.module.css';

const RegisterPage = (props) => {

    // User's session
    const {setUser} = React.useContext(UserSessionContext);

    // User's data
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [error, setError] = React.useState("");

    // set user details
    const onChangeValue = (e) => {
        e.preventDefault();
        switch(e.target.id) {
            case 'email': setEmail(e.target.value); break;
            case 'username': setUsername(e.target.value); break;
            case 'password': setPassword(e.target.value); break;
            case 'fname': setFirstName(e.target.value); break;
            case 'lname': setLastName(e.target.value); break;
            default:
        }
    }

    // Sends requested data to BE
    // Log user if sussess
    // Save user's session in a cookie 
    const register = async () => {
        const registrationDetails = await registerApi.register(
            {
                email,
                firstName,
                lastName,
                password,
                username
            }
        );
        if(registrationDetails.error) {
            setError(registrationDetails.message)
        } else {
            setUser( registrationDetails);
            setSessionCookie(registrationDetails);
            props.history.push(HOME_PAGE);
        }
      }

    // submit data
    const onSubmit = async (event) => {
        event.preventDefault();
        const checkResult = checkRegistrationData();
        if( checkResult ) {
            register();
        }
    };

    const checkRegistrationData = () => {
            if( !username || username === "") {
                setError("Username can not be empty..");
                return false;
            }

            if( !password || password === "") {
                setError("Password can not be empty..");
                return false;
            }

            if( !email || email === "") {
                setError("Email can not be empty..");
                return false;
            }

            if( !firstName || firstName === "") {
                setError("'First name' can not be empty..");
                return false;
            }

            if( !lastName || lastName === "") {
                setError("'Last name' can not be empty..");
                return false;
            }
          
            return true;
    }


    return (
        <FormLayout>
            <span className={styles.error}>{error}</span>
            <InputField 
                id="email"
                type="text" 
                inputName="email" 
                title="Email" 
                placeholder="Your email .."
                onChange={onChangeValue} />
            <InputField 
                id="fname" 
                type="text" 
                inputName="fname" 
                title="First name" 
                placeholder="Your first name.." 
                onChange={onChangeValue} />
            <InputField 
                id="lname" 
                type="text" 
                inputName="lname" 
                title="Last name" 
                placeholder="Your last name.." 
                onChange={onChangeValue} />
            <InputField 
                id="username" 
                type="text" 
                inputName="username" 
                title="Username" 
                placeholder="Your username.." 
                onChange={onChangeValue} />
            <InputField 
                id="password" 
                type="password" 
                inputName="password" 
                title="Password" 
                placeholder="Your password.." 
                onChange={onChangeValue} />
            <InputField 
                id="rwpassword" 
                type="text" 
                inputName="rwpassword" 
                title="Retype password" 
                placeholder="Type your password again ..." 
                onChange={onChangeValue} />

            <SubmitButton title="Login" onSubmit={onSubmit} />
        </FormLayout>
    )
}

export default RegisterPage;