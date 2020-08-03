import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import Header from '../Header/Header';
import HomePage from '../../pages/HomePage/HomePage';
import LoginPage from '../../pages/LoginPage.jsx/LoginPage';
import RegisterPage from '../../pages/RegisterPage.jsx/RegisterPage';

// Config
import { HOME_PAGE, LOGIN_PAGE, REGISER_PAGE, MY_GROUPS_PAGE, CREATE_GROUP_PAGE, VIEW_GROUP_PAGE } from '../../config/routes';

// Styles
import styles from './navigation.module.css';
import { UserSessionProvider } from '../../contexts/userContext';
import MyGroupsPage from '../../pages/MyGroupsPage/MyGroupsPage';
import CreateGroupPage from '../../pages/CreateGroupPage/CreateGroupPage';
import GroupPage from '../../pages/GroupPage/GroupPage';

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
                  <Route path={MY_GROUPS_PAGE} exact component={MyGroupsPage} />
                  <Route path={CREATE_GROUP_PAGE} exact component={CreateGroupPage} />
                  <Route path={VIEW_GROUP_PAGE.concat(":groupId")} exact component={GroupPage} />
              </Switch>
          </BrowserRouter>
        </UserSessionProvider>
      </div>
    </div>
  );
}

export default Navigation;
