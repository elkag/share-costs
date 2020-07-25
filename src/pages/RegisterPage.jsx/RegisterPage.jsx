import React from 'react';
// Configuration
import { HOME_PAGE } from '../../config/routes';
import { setSessionCookie, deleteSessionCoockie } from '../../config/session';
import { UserSessionContext } from '../../contexts/userContext';

// API
import { registerApi } from '../../api/shareCostsBackend/registerApi';
import { loginApi } from '../../api/shareCostsBackend/loginApi';

// Components
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';


const RegisterPage = (props) => {

    // Session context
    const [session, setSession] = React.useContext(UserSessionContext);

     // if there is some error from the server side
    const [serverError, setServerError] = React.useState( true );

    const logIn = async (loginUsername, loginPassword) => {
        const sesionDetails = await loginApi.logIn(loginUsername, loginPassword);
        if(sesionDetails.error) {
            setServerError(sesionDetails.message)
        } else {
            setSession( {user: sesionDetails.user} );
            setSessionCookie(sesionDetails);
            props.history.push(HOME_PAGE);
        }
      }

    /**
     * Sends requested data to BE
     * TODO: Auto login user
     */
    const onSubmit = async (
        email,
        firstName,
        lastName,
        password,
        username
    ) => {
        const registrationSuccess = await registerApi.register(
            {
                email,
                firstName,
                lastName,
                password,
                username
            }
        );

        if(!registrationSuccess) {
            setServerError("Server Error")
        } else {
            deleteSessionCoockie("session")
            await logIn(username, password)
        }
    };

    return (
        <RegisterForm error={serverError} onSubmit={onSubmit} />
    )
}

export default RegisterPage;