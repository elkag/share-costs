import { GET_GROUP_URL } from "./config/config";
import { getSessionCookie } from "../../config/session";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const getGroupApi = {
    getGroup: async (groupId) => {
            const response = await fetch(GET_GROUP_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + getSessionCookie()
                },
                body: `groupId=${groupId}`
            });

            if(response.ok) {
                const json = await response.json();
                return json;
            } 
                
            const error = await ApiErrorHandler.handle(response);
            return error;
    }
}
