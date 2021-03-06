import { NEW_EXPENSE_API } from './config/config';
import { getSessionCookie } from '../../config/session';

/**
 * {
    "description": "string",
    "groupId": "string",
    "total": number,
    "type": "string",
    "users": [
        {
        "amount": number,
        "id": "string",
        "userId": "string",
        "weight": number
        }
    ]
    }
 */
export const sendExpenseApi = {
    requestExpense: async (request) => {

        return fetch(NEW_EXPENSE_API,
            {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getSessionCookie()
                    },
                body: JSON.stringify( request)
            }
            ).then( response => {
                    if(response.ok) {
                        return response;
                    } 
                    throw response;
                }
            ).then( json => {
                    return json;
                }
            ).catch( error => {
                console.log("Error occurred");
                if (error instanceof Error) {
                    // {message: "..."}
                    return { error: true, message: error.message }
                }
                console.log(error)
                return { error: true, message: "Wrong username or password" }
                
        }).then(response => {
            return response;
        })
  }
}