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
                body: JSON.stringify({username})
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
                    // {message: "..."}
                    return { error: true, message: error.message }
                }
                return error.json().then((responseJson) => {
                    return responseJson;
                }
            )
        }
        ).then(response => {
            return response;
        })
  }
}