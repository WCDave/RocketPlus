import * as React from 'react';


export interface JsonRoute {
  path:      string;
  exact:     boolean;
  component?: (x?:any)=> React.ReactElement;
  sidebar:    string;
  main:      ()=> string;
  children?:  JsonRoute[];
}
