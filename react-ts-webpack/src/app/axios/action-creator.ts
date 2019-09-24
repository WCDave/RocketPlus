export const createAction = ({type, endpointUrl, data}: { type: string, endpointUrl?: string, data: any })=>{
    return {
       type,
       endpointUrl,
       data
    }
}