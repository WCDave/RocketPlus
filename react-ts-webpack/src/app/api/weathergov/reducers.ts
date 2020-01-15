import { ActionTypes, TypeKeys } from './actions';
import { Data } from './model';


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
