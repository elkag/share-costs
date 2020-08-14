import { CREATE_GROUP_API } from "./config/config";
import { getSessionCookie } from "../../config/session";

/**
 * {
    "name": "string",
    "description": "string"
    "userIds": []
    }
 */
export const createGroupApi = {
    createGroup: async (
                {
                    name,
                    description,
                    userIds
                }
            ) => {
            return fetch(CREATE_GROUP_API,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getSessionCookie().jwtToken
                    },
                    body: JSON.stringify({
                        name,
                        description,
                        userIds,
                    })
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
