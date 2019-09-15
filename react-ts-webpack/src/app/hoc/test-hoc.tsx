import * as React from 'react';
import { Provider } from 'react-redux';
import {Store} from "redux";
import configureStore from '../configureStore';

const TestWrapper=(W:  React.ComponentType, store:Store<any>)=>{
  return class WrappedHOC extends React.Component {

    render() {
      return (
          <Provider store={store} >
            <W  />
          </Provider>
      );
    }
  }
}

export default TestWrapper ;
