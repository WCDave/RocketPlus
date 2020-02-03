import { ApiStatus, EntityState } from '~/navigation/types';
import { ActionTypes, TypeKeys } from './actions';
import { QuakeData } from './model';


export const quakeData = (state:EntityState<QuakeData>={ entity:undefined, status:ApiStatus.Idle }, action:ActionTypes):EntityState<QuakeData> => {
    switch (action.type) {
        case TypeKeys.GET_QUAKE_RESPONSE:
            return {
                ...state, ...action.data
            };
      case TypeKeys.GET_QUAKE_REQUEST:
        return {
          status: ApiStatus.Fetching, entity: undefined
        };
        default:
            return state;
    }
};
