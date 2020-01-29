export const createAction = ({ type, data }:ActionType)=>{
    return {
       type,
       data
    };
};

export type ActionType = { type: string, endpointUrl?: string, data?: any };
