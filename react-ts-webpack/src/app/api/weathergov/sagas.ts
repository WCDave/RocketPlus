import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import {actions, TypeKeys} from "./actions";
import {ApiService} from "../../axios/service";

export const sagaWatchers = [watchWeatherRequests];


function* watchWeatherRequests() {
    yield takeLatest(TypeKeys.GET_LATEST_WX_REQUEST, getLatestWx);
}

function* getLatestWx(action: ReturnType<typeof actions.getLatestWeatherRequest>){
    // const promise = service().get({url:action.endpointUrl, payload:action.data});

    const data = yield call( ()=>ApiService.get({url:action.endpointUrl, payload:action.data}) );
    yield put(actions.getLatestWeatherResponse(data.data))
}


// export async function accumulationRuleGet(get: AccumulationRuleGet) {
//     const request: ApiRequest<AccumulationRuleGet> = {
//         url: `${endpoint}/read`,
//         data: get
//     };
//     const response = await ApiService.post<AccumulationRuleGet, GetAccumulationRuleResponse>(request);
//     return response.data.accumulationRule;
// }
