import { VALIDATE_SERVICE_URL } from './config/config';
import { getSessionCookie } from '../../config/session';

export const validateApi = {
    validate: async () => {

        return fetch(VALIDATE_SERVICE_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': 'Bearer ' + getSessionCookie()
                }
            }
            ).then( response => {
                    if(response.ok) {
                        return response.json();
                    } 
                    throw response;
                }
            ).then( json => {
                    return json;
                }
            ).catch( error => {
                if (error instanceof Error) {
                    return { error: true, message: error.message }
                }
                
                return error.json().then((responseJson) => {
                    return responseJson;
                }
                
                )
                
        }).then(response => {
            return response;
        })
  }
}