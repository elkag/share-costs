import { GET_GROUPS_URL } from "./config/config";
import { getSessionCookie } from "../../config/session";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const getGroupsApi = {
    getGroups: async () => {
           
        const response = await fetch(GET_GROUPS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getSessionCookie()
                },
                
            }
        )
           
        if(response.ok) {
            const json = await response.json();
            return json;
        } 
            
        const error = await ApiErrorHandler.handle(response);
        return error;   
  }
}
