import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';
import monitorReducersEnhancer from './middleware/monitorReducers'
import loggerMiddleware from './middleware/logger'
import {rootReducer}  from './reducers'
import {rootSaga} from "./sagas";

export default function configureStore(preloadedState?:any) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [loggerMiddleware, thunkMiddleware, sagaMiddleware]
  const middlewareEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = compose(...enhancers)

  // var store =  createStore(combineReducers({delay:adjuster}), /* preloadedState, */
  //     (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middleWare));

  const store = createStore(rootReducer, preloadedState, composedEnhancers as StoreEnhancer<any>);

  sagaMiddleware.run(rootSaga);

  return store
}
