import 'ag-grid-community/src/styles/ag-grid.scss';
// import 'ag-grid-community/src/styles/ag-theme-balham/sass/ag-theme-balham.scss';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router';
import { Router, Switch } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
// import {  } from './components/Hello';
import { RocketData } from '~/app/components/rocket-data';
import { Navigation } from '../navigation/navigation';
import { JsonRoute } from '../navigation/types';
import './App.scss';
import { Play } from './components/play';
import { configureStore } from './configureStore';
import adjuster from './DelayReducer';
import { ErrorBoundary } from './error-boundary';
import { routes } from './routes';
// ReactDOM.render(<Hello compiler="Typescript" framework="React" bundler="Webpack" />,
// history={{location:{pathname:'', search:'', state:'', hash:'', },length:0, action:undefined }}

const middleWare = [];
middleWare.push(thunk);
const loggerMiddleware = createLogger({
  predicate: () => true,
  diff: true
});
middleWare.push(loggerMiddleware);

const store = configureStore({ sampleReducer: 'root' });

export const history = createBrowserHistory({ basename: '/' });

export const getStore = () => {
  return store;
};
// var store =  createStore(combineReducers({delay:adjuster}), /* preloadedState, */
//     (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middleWare));

const buildRoutes = (routerRoutes:JsonRoute[], parent?:JsonRoute): [] => {

  const resultRoutex: React.ReactElement[] = [];
  routerRoutes.map((route: any) => {
      resultRoutex.push((<Route
        key={parent ? `${parent}${route.path}` : route.path}
        exact={route.exact}
        path={parent ? `${parent}${route.path}` : route.path}
        render={route.component}
      />));
      if (route.children) {
        resultRoutex.push(...buildRoutes(route.children, parent ? `${parent}${route.path}` : route.path));
      }
    }
  );

  // @ts-ignore
  return resultRoutex.flat(20);
};

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <div className="row">
            <div className="col-sm-1">
              <Navigation />
            </div>
            <div className="col-sm-11">
              {buildRoutes(routes)}
            </div>
          </div>
        </Switch>
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
