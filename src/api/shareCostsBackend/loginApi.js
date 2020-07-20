import { LOGIN_SERVICE_URL } from './config';

export const loginApi = {
    logIn: async (username, password) => {
            const promise = await fetch(LOGIN_SERVICE_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // body data type must match "Content-Type" header
                    body: JSON.stringify({username, password})
                }
            );
        const response = await promise.json(); 
        return response;         
  }
}