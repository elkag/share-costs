import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import Header from '../Header/Header';
import HomePage from '../../pages/HomePage/HomePage';
import LoginPage from '../../pages/LoginPage.jsx/LoginPage';
import RegisterPage from '../../pages/RegisterPage.jsx/RegisterPage';

// Context
import userSessionContext  from '../../contexts/userContext';

// Config
import { HOME_PAGE, LOGIN_PAGE, REGISER_PAGE } from '../../config/routes';
import { getSessionCookie } from '../../config/session';

// Styles
import styles from './navigation.module.css';



function Navigation() {

  const [session, setUser] = useState(getSessionCookie("session"));
  const userSession = { session, setUser };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <userSessionContext.Provider value={userSession}>
          <BrowserRouter>
            <Header/>
              <Switch>
                  <Route path={HOME_PAGE} exact component={HomePage}/>
                  <Route path={LOGIN_PAGE} exact component={LoginPage} />
                  <Route path={REGISER_PAGE} exact component={RegisterPage} />
              </Switch>
          </BrowserRouter>
        </userSessionContext.Provider>
      </div>
    </div>
  );
}

export default Navigation;
