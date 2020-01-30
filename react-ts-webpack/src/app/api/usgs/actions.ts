import { createAction } from '../../axios/action-creator';


export enum TypeKeys {
    GET_QUAKE_REQUEST = 'GET_QUAKE_REQUEST',
    GET_QUAKE_RESPONSE = 'GET_QUAKE_RESPONSE'
}


export const actions = {
    getQuakeRequest: (search: {mag:string, period: string}) =>
        createAction({
            type: TypeKeys.GET_QUAKE_REQUEST,
            data: search
        }),
    getQuakeResponse:(data:any)=> createAction({ data,  type:TypeKeys.GET_QUAKE_RESPONSE })
};

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = {
    [actionCreator: string]: FunctionType;
};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export type ActionTypes = ActionsUnion<typeof actions>;

