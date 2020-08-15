import { JOIN_GROUP_URL } from "./config/config";
import { getSessionCookie } from "../../config/session";

export const joinGroupApi = {
    join: async (groupId) => {
            return fetch(JOIN_GROUP_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + getSessionCookie().jwtToken
                    },
                    body: `groupId=${groupId}`
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
