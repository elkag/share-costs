import { CREATE_GROUP_API } from "./config/config";
import { getSessionCookie } from "../../config/session";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

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
            const response = await fetch(CREATE_GROUP_API,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getSessionCookie()
                },
                body: JSON.stringify({
                    name,
                    description,
                    userIds,
                })
            } );
        
        if(response.ok) {
            const json = await response.json();
            return json;
        } 
            
        const error = await ApiErrorHandler.handle(response);
        return error;   
    }
}
