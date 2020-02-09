import { toast } from 'react-toastify';
import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import { logger } from './middleware/logger';
import { monitorReducerEnhancer } from './middleware/monitorReducers';
import { rootReducer }  from './reducers';
import { rootSaga } from './sagas';

export function configureStore(preloadedState?:any) {
  toast.configure({ position:'top-center' });
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [logger, thunkMiddleware, sagaMiddleware];
  const middlewareEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composedEnhancers = compose(...enhancers);

  // var store =  createStore(combineReducers({delay:adjuster}), /* preloadedState, */
  //     (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middleWare));

  const store = createStore(rootReducer, preloadedState, composedEnhancers as StoreEnhancer<any>);

  sagaMiddleware.run(rootSaga);

  return store;
}
