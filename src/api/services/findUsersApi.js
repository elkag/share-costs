import { FIND_USER_URL } from "./config/config";
import { getSessionCookie } from "../../config/session";

export const findUserApi = {
    findUser: async (userId, groupId) => {
            return fetch(FIND_USER_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + getSessionCookie().jwtToken
                    },
                    body: `value=${userId}&groupId=${groupId}`
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
                console.log(json);
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
