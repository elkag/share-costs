import { CHECK_USERNAME_SERVICE_URL } from './config/config';

/**
 * request:
 *          { username: String }
 * response:
 *            { 
 *              username: String, 
 *              error: Boolean, 
 *              message: String 
 *            }
 */
export const checkUsernameApi = {
    checkUsername: async (username) => {

        return await fetch(CHECK_USERNAME_SERVICE_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body data type must match "Content-Type" header
                body: JSON.stringify({username})
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
                return error.json().then((responseJson) => {
                    console.log(responseJson);
                    console.log("message = " + responseJson.message);
                    return responseJson;
                }
            )
        }
        ).then(responce => {
            return responce;
        })
  }
}