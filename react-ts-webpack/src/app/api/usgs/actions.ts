import { createAction } from '../../axios/action-creator';


export enum TypeKeys {
    GET_SIG_DAY_REQUEST = 'GET_SIG_DAY_REQUEST',
    GET_SIG_DAY_RESPONSE = 'GET_SIG_DAY_RESPONSE'
}


export const actions = {
    getSigDayRequest: (search?: string) =>
        createAction({
            type: TypeKeys.GET_SIG_DAY_REQUEST,
            endpointUrl: `earthquakes/feed/v1.0/summary/significant_day.geojson`,
            data: search
        }),
    getSigDayResponse:(data:any)=> createAction({ data,  type:TypeKeys.GET_SIG_DAY_RESPONSE })
};

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = {
    [actionCreator: string]: FunctionType;
};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export type ActionTypes = ActionsUnion<typeof actions>;

