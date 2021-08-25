import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import Login from './pages/auth/login';
import RouteWrapper from './components/routeWrapper';
import AuthLayout from './layouts/auth';
import { LightTheme } from './theme';

const defaultRoute = "/login";

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to={defaultRoute} />} />
        <RouteWrapper exact path="/login" component={Login} layout={AuthLayout} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
