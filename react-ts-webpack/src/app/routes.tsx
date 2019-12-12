import * as React from 'react';
import { Child } from './child';
import RocketData from './components/rocket-data';

export const routes = [{
  path: '/',
  exact: true,
  component:  ()=>(<RocketData />),
  sidebar: () => 'RocketData',
  main: () => 'Home'
},
  {
    path: '/bubblegum',
    component:  ()=>(<Child x="0..0" />),
    sidebar: () => 'Child',
    main: () => 'Bubblegum'
  },
  {
    path: '/shoelaces',
    component:  ()=>(<Child x="00" />),
    children: [
      {
        path: '/child1',
        exact: true,
        component:  ()=>(<Child x="11" />),
        sidebar: () => 'Child1',
        children: [
          {
            path: '/child2',
            exact: true,
            component:  ()=>(<Child x="22" />),
            sidebar: () => 'Child2',
            main: () => 'Child2'}
        ],
        main: () => 'Child1'}
    ],
    sidebar: () => 'shoelaces!',
    main: () => 'Shoelaces'
  }];
