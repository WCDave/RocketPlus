import * as React from 'react';
import Child  from './child';
import { RocketData } from './components/rocket-data';

export const routes = [{
  path: '/',
  exact: true,
  component:  (x?:any)=>(<RocketData />),
  sidebar:  'RocketData',
  main: () => 'Home'
},
  {
    path: '/bubblegum',
    component:  (x?:any)=>(<Child x="0..0" />),
    sidebar:  'Child',
    main: () => 'Bubblegum',
    exact: true,
  },
  {
    path: '/shoelaces',
    // component: (x?:any)=>(<Child x="00" />),
    exact: true,
    children: [
      {
        path: '/child1',
        exact: true,
        component:  (x?:any)=>(<Child x="11" />),
        sidebar:  'Child1',
        children: [
          {
            path: '/child2',
            exact: true,
            component:  (x?:any)=>(<Child x="22" />),
            sidebar:  'Child2',
            main: () => 'Child2'}
        ],
        main: () => 'Child1'}
    ],
    sidebar:  'shoelaces!',
    main: () => 'Shoelaces'
  }];
