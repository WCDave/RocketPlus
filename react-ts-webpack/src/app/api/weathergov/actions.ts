import { createAction } from '../../axios/action-creator';


export enum TypeKeys {
    GET_LATEST_WX_REQUEST = 'GET_LATEST_WX_REQUEST',
    GET_LATEST_WX_RESPONSE = 'GET_LATEST_WX_RESPONSE',
    GET_WX_STATIONS_REQUEST = 'GET_WX_STATIONS_REQUEST',
    GET_WX_STATIONS_RESPONSE = 'GET_WX_STATIONS_RESPONSE'
}


export const actions = {
    getLatestWeatherRequest: (search: string) =>
        createAction({
            type: TypeKeys.GET_LATEST_WX_REQUEST,
            data: search
        }),
    getLatestWeatherResponse:(data:any)=> createAction({ data,  type:TypeKeys.GET_LATEST_WX_RESPONSE }),
    getWxStationsRequest:()=> createAction({ type:TypeKeys.GET_WX_STATIONS_REQUEST  }),
    getWxStationsResponse:(data:any)=> createAction({data, type:TypeKeys.GET_WX_STATIONS_RESPONSE})
};

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = {
    [actionCreator: string]: FunctionType;
};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export type ActionTypes = ActionsUnion<typeof actions>;

