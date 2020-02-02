import reduceReducers from 'reduce-reducers';
import { AnyAction, combineReducers } from 'redux';
import { quakeData } from './api/usgs/reducers';
import { airportData, wx } from './api/weathergov/reducers';
import adjuster from './DelayReducer';

const appReducer = combineReducers({
  adjuster,
  wx,
  quakeData,
  airportData,
      sampleReducer: (state: any = { x:'lll' }, action: AnyAction) => {
        switch (action.type) {
          case 'X' : {
            return { ...state, result: action.result };
            break;
          }
          case  'Y': {
            return { ...state, field: action.field };
          }
          default:
            return {
              ...state
            };
        }
      }
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
