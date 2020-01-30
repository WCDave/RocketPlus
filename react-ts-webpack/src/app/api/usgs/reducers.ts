import { ActionTypes, TypeKeys } from './actions';
import { QuakeData } from './model';


export const quakeData = (state:Partial<QuakeData>={}, action:ActionTypes):Partial<QuakeData> => {
    switch (action.type) {
        case TypeKeys.GET_QUAKE_RESPONSE:
            return {
                ...state, ...action.data
            };
        default:
            return state;
    }
};
