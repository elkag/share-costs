import React, { Fragment } from 'react';

// Components
import LinkButton from '../LinkButton/LinkButton';

// Config
import UserSessionContext from '../../contexts/userContext';
import { LOGIN_PAGE, REGISER_PAGE, HOME_PAGE } from '../../config/routes';
import { deleteSessionCoockie } from '../../config/session';

// Styles
import styles from './header.module.css';

const Header = () => {

    const userSessionContext = React.useContext(UserSessionContext);
   
    const { setUser } = React.useContext(UserSessionContext);
   
    const logOut = (event) => {
        event.preventDefault();
        deleteSessionCoockie("session");
        setUser({});
    }

    return (
        <div className={styles.header}>
            <LinkButton href={HOME_PAGE} type="header" title="Title"/>
            <div className={styles["header-right"]}>
                {
                   userSessionContext.session && userSessionContext.session.user ? ( 
                            <LinkButton href={HOME_PAGE} type="header" title="Logout" onClick={ logOut} />
                        ) : (
                            <Fragment>
                                <LinkButton href={LOGIN_PAGE} type="header" title="Login" />
                                <span> | </span>
                                <LinkButton href={REGISER_PAGE} type="header" title="Register" />
                            </Fragment>
                    )   
                    
                }
            </div>
            <div>{userSessionContext.session && userSessionContext.session.user ? userSessionContext.session.user.email : ""}</div>
        </div>
    );
}

export default Header;