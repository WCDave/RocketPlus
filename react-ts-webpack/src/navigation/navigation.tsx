import * as React from 'react';
import { NavLink, Route, Router, Switch } from 'react-router-dom';
import { routes } from '../app/routes';
import { JsonRoute } from './types';

export class Navigation extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  buildNavs = (routerRoutes:JsonRoute[], parent?:JsonRoute, pathAccum?:string): [] => {
    const resultRoutex: any[] = [];
    routerRoutes.map((route: any, idx:number) => {
        resultRoutex.push((
          <li key={idx}>
            <NavLink to={{ pathname: pathAccum ? `${pathAccum}${route.path}`:route.path }}>
              {route.sidebar()}
            </NavLink>
          </li>));
        if (route.children) {
          resultRoutex.push(
            <ul key={`${+idx}${route.path}`} className="site-navigation">
               {this.buildNavs(route.children, route, parent ? `${parent.path}${route.path}`:route.path)}
            </ul>
          );
        }
      }
    );

    // @ts-ignore
    return resultRoutex.flat(20);
  };

  render() {
    return (
      <ul className="site-navigation">
        {this.buildNavs(routes)}
      </ul>
    );
  }
}
