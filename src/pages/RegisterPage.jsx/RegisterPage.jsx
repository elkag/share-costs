import React from 'react';
// Configuration
import { HOME_PAGE } from '../../config/routes';
import { setSessionCookie, deleteSessionCoockie } from '../../config/session';
import { UserContext } from '../../contexts/userContext';

// API
import { registerApi } from '../../api/services/registerApi';
import { loginApi } from '../../api/services/loginApi';

// Components
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';


const RegisterPage = (props) => {

    // Session context
    const [, setSession] = React.useContext(UserContext);
    const [loading, setLoading] = React.useState(false);

     // if there is some error from the server side
    const [error, setError] = React.useState( true );

    const logIn = async (loginUsername, loginPassword) => {
        const sesionDetails = await loginApi.logIn(loginUsername, loginPassword);
        if(sesionDetails.error) {
            setError(sesionDetails.message)
        } else {
            setSession( {user: sesionDetails.user} );
            setSessionCookie(sesionDetails);
            props.history.push(HOME_PAGE);
        }
      }

    /**
     * Sends requested data to BE
     */
    const onSubmit = async (
        email,
        firstName,
        lastName,
        password,
        username
    ) => {
        setLoading(true);
        const responce = await registerApi.register(
            {
                email,
                firstName,
                lastName,
                password,
                username
            }
        );

        setLoading(false);
        if(responce.error) {
            setError(responce.message)
        } else {
            deleteSessionCoockie("session")
            await logIn(username, password)
        }
    };

    return (
        <RegisterForm error={error} isLoading={loading} onSubmit={onSubmit} />
    )
}

export default RegisterPage;