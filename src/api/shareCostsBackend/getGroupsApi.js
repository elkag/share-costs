import { GET_GROUPS_URL } from "./config/config";
import { getSessionCookie } from "../../config/session";

export const getGroupsApi = {
    getGroups: async () => {
            return fetch(GET_GROUPS_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getSessionCookie().jwtToken
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
        }).then(responce => {
            return responce;
        }) 
  }
}
