import { AnyAction, combineReducers, Store } from 'redux';

export const logger = (store:Store<any>) => (next:(e:AnyAction)=>any) => (action:AnyAction) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};


