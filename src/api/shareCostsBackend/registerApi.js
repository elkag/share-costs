import { REGISTER_SERVICE_URL } from "./config/config";

export const registerApi = {
    register: async (
        {
            email,
            firstName,
            lastName,
            password,
            username
        }
    ) => {
            return await fetch(REGISTER_SERVICE_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // body data type must match "Content-Type" header
                    body: JSON.stringify({
                        email,
                        firstName,
                        lastName,
                        password,
                        username,
                    })
                }
            )
            .then( response => {
                    if(response.ok) {
                        return {error: false};
                    } 
                    throw response;
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
