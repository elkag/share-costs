import { LOGIN_SERVICE_URL } from './config/config';

export const loginApi = {
    logIn: async (username, password) => {

        return fetch(LOGIN_SERVICE_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                // body data type must match "Content-Type" header
                body: JSON.stringify({username, password})
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