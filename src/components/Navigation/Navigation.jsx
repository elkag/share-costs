import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import Header from '../Header/Header';
import HomePage from '../../pages/HomePage/HomePage';
import LoginPage from '../../pages/LoginPage.jsx/LoginPage';
import RegisterPage from '../../pages/RegisterPage.jsx/RegisterPage';
import MyGroupsPage from '../../pages/MyGroupsPage/MyGroupsPage';
import AboutPage from '../../pages/About/About';
import GroupPage from '../../pages/GroupPage/GroupPage';
import CreateGroupPage from '../../pages/CreateGroupPage/CreateGroupPage';

// Config
import { HOME_PAGE, 
        LOGIN_PAGE, 
        REGISTER_PAGE, 
        MY_GROUPS_PAGE, 
        CREATE_GROUP_PAGE, 
        VIEW_GROUP_PAGE, 
        ABOUT_PAGE,
        OAUTH2_REDIRECT_PAGE} from '../../config/routes';

// Styles
import styles from './navigation.module.css';
import { UserSessionProvider } from '../../contexts/userContext';
import OAuth2RedirectHandler from '../oauth2/OAuth2RedirectHandler';


function Navigation() {

  return (
    <div className={styles.app}>
      <UserSessionProvider>
        <BrowserRouter>
          <Header/>
            <div className={styles.container}>
              <Switch>
                  <Route path={OAUTH2_REDIRECT_PAGE} component={OAuth2RedirectHandler} />
                  <Route path={HOME_PAGE} exact component={HomePage}/>
                  <Route path={ABOUT_PAGE} exact component={AboutPage} />
                  <Route path={LOGIN_PAGE} exact component={LoginPage} /> 
                  <Route path={REGISTER_PAGE} exact component={RegisterPage} />
                  <Route path={MY_GROUPS_PAGE} exact component={MyGroupsPage} />
                  <Route path={CREATE_GROUP_PAGE} exact component={CreateGroupPage} />
                  <Route path={VIEW_GROUP_PAGE.concat(":groupId")} exact component={GroupPage} />
                 
              </Switch>
            </div>
          </BrowserRouter>
        </UserSessionProvider>
      </div>
  );
}

export default Navigation;
