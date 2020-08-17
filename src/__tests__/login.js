// __tests__/checkout.js
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import { BrowserRouter, Route } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import LoginPage from '../pages/LoginPage.jsx/LoginPage';
import { server, rest } from '../test-utils/server';
import { LOGIN_SERVICE_URL } from '../api/services/config/config';

test('clicking "confirm" submits payment', async () => {

  render(
    <BrowserRouter>
      <Route>
        <UserContext.Provider value={[]}>
          <LoginPage />
        </UserContext.Provider>
      </Route>
      </BrowserRouter>
  );
  
  fireEvent.click(screen.getByTestId('submit'));
})

// edge/error case, special server stuff
// note that the afterEach(() => server.resetHandlers()) we have in our
// setup file will ensure that the special handler is removed for other tests
test('shows server error if the request fails', async () => {
    const testErrorMessage = 'THIS IS A TEST FAILURE'
    server.use(
      rest.post(LOGIN_SERVICE_URL, async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: testErrorMessage}))
      }),
    )
    render(
        <BrowserRouter>
          <Route>
            <UserContext.Provider value={[]}>
              <LoginPage />
            </UserContext.Provider>
          </Route>
          </BrowserRouter>
      );

      fireEvent.click(screen.getByTestId('submit'));
      //expect(await screen.getByTestId("errorMessage"))..
  })