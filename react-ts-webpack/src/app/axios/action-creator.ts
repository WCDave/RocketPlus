export const createAction = ({ type, endpointUrl, data }:ActionType)=>{
    return {
       type,
       endpointUrl,
       data
    };
};

export type ActionType = { type: string, endpointUrl?: string, data?: any };
