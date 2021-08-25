import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import Login from './pages/auth/login';
import Home from './pages/home/home';
import RouteWrapper from './components/routeWrapper';
import AuthLayout from './layouts/auth';
import HomeLayout from './layouts/home';
import { LightTheme } from './theme';

const defaultRoute = "/home";

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to={defaultRoute} />} />
        <RouteWrapper exact path="/login" component={Login} layout={AuthLayout} />
        <RouteWrapper exact path="/home" component={Home} layout={HomeLayout} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
