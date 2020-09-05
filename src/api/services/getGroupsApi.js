import { GET_GROUPS_URL } from "./config/config";
import { getSessionCookie } from "../../config/session";

export const getGroupsApi = {
    getGroups: async () => {
            return fetch(GET_GROUPS_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Authorization': 'Bearer ' + getSessionCookie()
                    },
                    
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
