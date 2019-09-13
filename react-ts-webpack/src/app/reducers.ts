import { AnyAction, combineReducers } from 'redux';

const appReducer = combineReducers({
      sampleReducer: (s: any = {initState:{x:"lll"}}, a: AnyAction) => {
        return a.type
      }
    }
);

export const rootReducer = (state: any | undefined = {root:'root'}, action: AnyAction) => {
  if (action.type === 'APP_RESET') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
