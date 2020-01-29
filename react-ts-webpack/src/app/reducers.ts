import { AnyAction, combineReducers } from 'redux';
import adjuster from './DelayReducer';
import reduceReducers from 'reduce-reducers';
import {wx} from "./api/weathergov/reducers";
import { sigDay } from "./api/usgs/reducers";

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
      adjuster:adjuster,
      wx,
      sigDay
    }
);

// const appReducer = reduceReducers(
//       (state: any = {x:"lll", y:0}, action: AnyAction) => {
//         switch (action.type) {
//           case 'X' : {
//             return {...state, result: action.result, y:state.y+1};
//             break;
//           }
//           case  'Y': {
//             return {...state, field: action.field, y:state.y+1}
//           }
//           default:
//             return {
//               ...state
//             }
//         }
//       },
//       adjuster,
//     wx
//
// );

export const rootReducer = (state: any | undefined, action: AnyAction) => {
  if (action.type === 'APP_RESET') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
