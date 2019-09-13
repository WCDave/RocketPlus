import { AnyAction, combineReducers } from 'redux';
import adjuster from './DelayReducer';

const appReducer = combineReducers({
      sampleReducer: (state: any = {x:"lll"}, action: AnyAction) => {
        switch (action.type) {
          case 'X' : {
            return {...state, result: action.result};
            break;
          }
          case  'Y': {
            return {...state, field: action.field}
          }
          default:
            return {
              ...state
            }
        }
      },
    adjuster:adjuster
    }
);

export const rootReducer = (state: any | undefined, action: AnyAction) => {
  if (action.type === 'APP_RESET') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
