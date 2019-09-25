import {createAction} from "../../axios/action-creator";


export enum TypeKeys {
    GET_LATEST_WX_REQUEST = 'GET_LATEST_WX_REQUEST',
    GET_LATEST_WX_RESPONSE = 'GET_LATEST_WX_RESPONSE'
}


export const actions = {
    getLatestWeatherRequest: (search: string) =>
        createAction({
            type: TypeKeys.GET_LATEST_WX_REQUEST,
            endpointUrl: `/stations/${search}/observations/latest`,
            data: search
        }),
    getLatestWeatherResponse:(data:any)=> createAction({type:TypeKeys.GET_LATEST_WX_RESPONSE, data})
}

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = {
    [actionCreator: string]: FunctionType;
};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export type ActionTypes = ActionsUnion<typeof actions>;
