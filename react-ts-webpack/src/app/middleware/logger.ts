import { AnyAction, combineReducers, Store } from 'redux';

const logger = (store:Store<any>) => (next:(e:AnyAction)=>any) => (action:AnyAction) => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

export default logger
