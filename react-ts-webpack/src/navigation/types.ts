import * as React from 'react';


export interface JsonRoute {
  path:      string;
  exact:     boolean;
  component: ()=> React.ReactElement;
  sidebar:   ()=> string;
  main:      ()=> string;
  children?:  JsonRoute[];
}
