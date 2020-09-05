import { REGISTER_SERVICE_URL } from "./config/config";
import { setSessionCookie } from "../../config/session";

export const registerApi = {
    register: async (
        {
            email,
            password,
            firstName,
            lastName,
            repeatPassword
        }
    ) => {
            return fetch(REGISTER_SERVICE_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // body data type must match "Content-Type" header
                    body: JSON.stringify({
                        email,
                        password,
                        firstName,
                        lastName,
                        repeatPassword
                    })
                }
            ).then( response => {
                if(response.ok) {
                    const jwt = response.headers.get("x-token");
                    setSessionCookie(jwt)
                    return response;
                } 
                throw response;
            }
        ).catch( error => {
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
