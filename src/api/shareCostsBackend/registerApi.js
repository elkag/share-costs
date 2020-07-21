import { REGISTER_SERVICE_URL } from "./config";

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
            const promise = await fetch(REGISTER_SERVICE_URL,
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
            );
        const isSuccess = promise.ok ? true : false;
        return isSuccess;         
  }
}