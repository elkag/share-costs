import { LOGIN_SERVICE_URL } from './config/config';

export const loginApi = {
    logIn: async (username, password) => {

        return fetch(LOGIN_SERVICE_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
                    console.log(json);
                    console.log("message = " + json);
                    return json;
                }
            ).catch( error => {
                console.log("Error occurred");
                if (error instanceof Error) {
                    // {message: "..."}
                    return { error: true, message: error.message }
                }
                console.log(error)
                return { error: true, message: "Wrong username or password" }
                
                /*return error.clone().json().then((responseJson) => {
                    console.log(responseJson);
                    console.log("message = " + responseJson.message);
                    return responseJson;
                }
            )*/
        }).then(responce => {
            return responce;
        })
  }
}