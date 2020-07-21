import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import Header from '../Header/Header';
import HomePage from '../../pages/HomePage/HomePage';
import LoginPage from '../../pages/LoginPage.jsx/LoginPage';
import RegisterPage from '../../pages/RegisterPage.jsx/RegisterPage';

// Config
import { HOME_PAGE, LOGIN_PAGE, REGISER_PAGE } from '../../config/routes';

// Styles
import styles from './navigation.module.css';
import { UserSessionProvider } from '../../contexts/userContext';



function Navigation() {

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <UserSessionProvider>
          <BrowserRouter>
            <Header/>
              <Switch>
                  <Route path={HOME_PAGE} exact component={HomePage}/>
                  <Route path={LOGIN_PAGE} exact component={LoginPage} />
                  <Route path={REGISER_PAGE} exact component={RegisterPage} />
              </Switch>
          </BrowserRouter>
        </UserSessionProvider>
      </div>
    </div>
  );
}

export default Navigation;
