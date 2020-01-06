import * as React from 'react';
import { RouteProps } from 'react-router';
import { withRouter } from 'react-router-dom';

interface OwnProps {
  to:string;
  onClick?:(ev:React.SyntheticEvent)=> void;
}

class NavButton extends React.Component<RouteProps & OwnProps> {
  constructor(props:any) {
    super(props);
  }

 render() {
   return ( <div /> );
 }
}

const nav = withRouter(NavButton);
export { nav as NavButton };
