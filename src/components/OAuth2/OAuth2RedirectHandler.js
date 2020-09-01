import React, { useCallback, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import { getUserInfoApi } from '../../api/services/getUserInfoApi';
import { setSessionCookie, getSessionCookie } from '../../config/session';
import { useHistory } from 'react-router-dom';
import { LOGIN_PAGE, MY_GROUPS_PAGE } from '../../config/routes';

const OAuth2RedirectHandler = (props) => {
    
    const history = useHistory();
    const [, setSession] = React.useContext(UserContext);
    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo = useCallback(async () => {
        const token = getUrlParameter("token");
        if(token) {
            const response = await getUserInfoApi.getUserInfo(token);
            if(response.error){
                history.push(LOGIN_PAGE);
            } else {
                setSession( {user: response.user} );
                setSessionCookie(response);
                history.push(MY_GROUPS_PAGE);
            }
        }

    }, [setUserInfo])

    useEffect( () => {
        getUserInfo();
    },[getUserInfo])
    
    const getUrlParameter = (name) => {

        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        
        var results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    return (        
       null
    )
}

export default OAuth2RedirectHandler;