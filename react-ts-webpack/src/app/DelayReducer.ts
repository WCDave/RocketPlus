import * as _ from 'lodash';



const adjuster = (state:any={result:'Hello'}, action:any) => {
    switch (action.type) {
        case 'XD' :{
            return {...state, result:action.id};
            break;
        }
        case  'ERROR':{
            return{...state, field:action.field}
        }
        default: return {
            ...state
        }
    }

}

export default adjuster
