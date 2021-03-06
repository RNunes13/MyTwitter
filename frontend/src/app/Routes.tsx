
import * as React from 'react';
import * as qs from 'querystring';
import { Redirect, Route, Switch } from 'react-router-dom';

// Views
import { TimelineView, LoginView, NotFoundView } from '../views/index';

/**
 * Handles redirection safely when not logged in.
 */
const PrivateRoute = ({ component, ...rest }: any) => (
  <Route { ... rest } render={(props:any) => {
    const username = sessionStorage.getItem('@MyTwitter:username') as string;

    if (username) return React.createElement(component, { ...props });

    return <Redirect to={{
      pathname: '/login',
      search: `?${qs.stringify({ from: props.location.pathname })}`,
    }} />;
  }}/>
);

/**
 * The main application router.
 */
export const MainRouter = () => (
  <Switch>
    <PrivateRoute path="/timeline" component={ TimelineView } />
    <Route exact path="/" render={(): React.ReactNode => <Redirect to="/timeline" /> }/>
    <Route path="/login" component={ LoginView } />
    <Route component={ NotFoundView } />
  </Switch>
);
