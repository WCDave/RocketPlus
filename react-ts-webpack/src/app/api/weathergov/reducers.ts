import { ApiStatus, EntityState } from '~/navigation/types';
import { ActionTypes, TypeKeys } from './actions';
import { AirportData, Data } from './model';


export const wx = (state:Partial<Data>={}, action:ActionTypes):Partial<Data> => {
    switch (action.type) {
        case TypeKeys.GET_LATEST_WX_RESPONSE:
            return {
                ...state, ...action.data
            };
        default:
            return state;
    }
};

export const airportData =(state:EntityState<AirportData[]>={ status:ApiStatus.Idle }, action:ActionTypes)
  :EntityState<AirportData[]>=>{
  switch (action.type) {
    case TypeKeys.GET_WX_STATIONS_RESPONSE:
      return { ...state, entity: action.data };
    default:
      return state;
  }
};
