import { ActionTypes, TypeKeys } from './actions';
import { SigDay } from './model';


export const sigDay = (state:Partial<SigDay>={}, action:ActionTypes):Partial<SigDay> => {
    switch (action.type) {
        case TypeKeys.GET_SIG_DAY_RESPONSE:
            return {
                ...state, ...action.data
            };
        default:
            return state;
    }
};
