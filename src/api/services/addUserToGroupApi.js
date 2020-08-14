import { ADD_USER_URL } from "./config/config";
import { getSessionCookie } from "../../config/session";

export const addUserToGroupApi = {
    addUser: async (groupId, userId) => {
            return fetch(ADD_USER_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + getSessionCookie().jwtToken
                    },
                    body: `userIds=${userId}&groupId=${groupId}`
                }
            )
            .then( response => {
                    if(response.ok) {
                        return response.json();
                    } 
                    throw response;
                }
            )
            .then( json => {
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
