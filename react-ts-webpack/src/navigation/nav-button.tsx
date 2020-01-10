import * as React from 'react';
import { RouteProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { history } from '../app/app';

interface OwnProps {
  to:string;
  onClick?:(ev:React.SyntheticEvent)=> void;
  label : string;
}

class NavButton extends React.Component<RouteProps & OwnProps> {
  constructor(props:any) {
    super(props);
  }

  onClickHandler =(ev:React.SyntheticEvent)=> {
    const { onClick, to } = this.props;
    history.push(to);
    onClick && onClick(ev);
  };

 render() {
    const { onClick, label } = this.props;
   return ( <span onClick={this.onClickHandler} > { label } </span> );
 }
}

const nav = withRouter(NavButton);
export { nav as NavButton };
