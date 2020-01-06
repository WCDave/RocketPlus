import * as React from 'react';
import { RouteProps } from 'react-router';
import { NavLink,  withRouter } from 'react-router-dom';
import { routes } from '~/app/routes';
import { JsonRoute } from './types';

class Navigation extends React.Component<RouteProps> {
  constructor(props: any) {
    super(props);
  }

  buildNavs = (routerRoutes:JsonRoute[], parent?:JsonRoute, pathAccum?:string): [] => {
    const resultRoute: any[] = [];
    routerRoutes.map((route: any, idx:number) => {
      const ref1 =React.createRef<HTMLUListElement>();
      const onClick =(ev:React.SyntheticEvent<HTMLLIElement>)=> {
        if(ref1 && ref1.current) {
          if (ref1.current.classList.contains('expanded')) {
            ref1.current.classList.remove('expanded');
            ref1.current.classList.add('collapsed');
          } else {
            ref1.current.classList.remove('collapsed');
            ref1.current.classList.add('expanded');
          }
        }
      };

      const { location } = this.props;
        resultRoute.push((
          <li key={idx} onClick={onClick}>
            <NavLink
              to={route.component ? { pathname: pathAccum ? `${pathAccum}${route.path}` : route.path } :
                location }>
              <button type="button" >
                {route.sidebar}
            </button>

            </NavLink>

          </li>));
        if (route.children) {
          resultRoute.push(
            <ul key={`${+idx}${route.path}`} ref={ref1} className="site-navigation collapsed" >
               {this.buildNavs(route.children, route, parent ? `${parent.path}${route.path}`:route.path)}
            </ul>
          );
        }
      }
    );

    // @ts-ignore
    return resultRoute.flat(20);
  };

  render() {
    const ref1 =React.createRef<HTMLUListElement>();
    return (
      <ul ref={ref1} className="site-navigation">
        {this.buildNavs(routes)}
      </ul>
    );
  }
}

const nav = withRouter(Navigation);
export { nav as Navigation };
