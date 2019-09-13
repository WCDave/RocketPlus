import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';

const TestWrapper=(W:  React.ComponentType)=>{
  return class WrappedHOC extends React.Component {

    public  store = configureStore();

    render() {
      return (
          <Provider store={this.store} >
            <W  />
          </Provider>
      );
    }
  }
}

export default TestWrapper ;
