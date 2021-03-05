import { REMOVE_PENDING_USER_URL } from "./config/config";
import { getSessionCookie } from "../../config/session";

export const removePendingUserApi = {
    removeUser: async (groupId, userId) => {
            return fetch(REMOVE_PENDING_USER_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getSessionCookie()
                    },
                    body: JSON.stringify({userId, groupId})
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
                console.log("Error occurred");
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
