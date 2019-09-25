import * as _ from 'lodash';



const adjuster = (state:any={result:'Hello',y:0}, action:any) => {
    switch (action.type) {
        case 'XD' :{
            return {...state, result:action.id, y:state.y+1};
            break;
        }
        case  'ERROR':{
            return{...state, field:action.field, y:state.y+1}
        }
        default: return {
            ...state
        }
    }

}

export default adjuster
