import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'

import monitorReducersEnhancer from './middleware/monitorReducers'
import loggerMiddleware from './middleware/logger'
import {rootReducer}  from './reducers'

export default function configureStore(preloadedState?:any) {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = compose(...enhancers)

  // var store =  createStore(combineReducers({delay:adjuster}), /* preloadedState, */
  //     (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middleWare));

  const store = createStore(rootReducer, preloadedState, composedEnhancers as StoreEnhancer<any>);

  return store
}
