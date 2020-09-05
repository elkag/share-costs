import { LOGIN_SERVICE_URL } from './config/config';
import { setSessionCookie } from '../../config/session';

export const loginApi = {
    logIn: async (email, password) => {

        return fetch(LOGIN_SERVICE_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                // body data type must match "Content-Type" header
                body: JSON.stringify({email, password})
            }
            ).then( response => {
                    if(response.ok) {
                        const jwt = response.headers.get("x-token");
                        setSessionCookie(jwt)
                        return response;
                    } 
                    throw response;
                }
            ).catch( error => {
                if (error instanceof Error) {
                    return { error: true, message: error.message }
                }
                

                return error;
            
                
        }).then(response => {
            return response;
        })
  }
}