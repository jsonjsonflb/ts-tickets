import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import HomePage from '@/routes/HomePage';

export interface IAppProps {
  [random: string]: any;
}

export default class Router extends React.Component<IAppProps> {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Suspense fallback={Loading}>
              <HomePage />
            </Suspense>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
