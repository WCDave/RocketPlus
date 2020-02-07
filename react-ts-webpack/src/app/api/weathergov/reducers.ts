import { ApiStatus, EntityState } from '~/navigation/types';
import { ActionTypes, TypeKeys } from './actions';
import { AirportData, Data } from './model';


export const wx = (state:EntityState<Data>={ status:ApiStatus.Idle }, action:ActionTypes):EntityState<Data> => {
    switch (action.type) {
        case TypeKeys.GET_LATEST_WX_RESPONSE:
            return {
                status:ApiStatus.Success, entity: action.data
            };
      case TypeKeys.GET_LATEST_WX_REQUEST:
        return {
          status: ApiStatus.Fetching, entity:undefined
        };
        default:
            return state;
    }
};

export const airportData =(state:EntityState<AirportData[]>={ status: ApiStatus.Idle }, action:ActionTypes)
  :EntityState<AirportData[]>=>{
  switch (action.type) {
    case TypeKeys.GET_WX_STATIONS_RESPONSE:
      return { ...state, entity: action.data };
    case TypeKeys.GET_WX_STATIONS_REQUEST:
      return {
        status: ApiStatus.Fetching, entity: undefined
      };
    default:
      return state;
  }
};
