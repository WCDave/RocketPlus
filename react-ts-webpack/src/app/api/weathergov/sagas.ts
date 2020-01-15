import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import { ApiService } from '../../axios/service';
import { actions, TypeKeys } from './actions';
import * as api from './api';

export const sagaWatchers = [watchWeatherRequests];


function* watchWeatherRequests() {
    yield takeLatest(TypeKeys.GET_LATEST_WX_REQUEST, getLatestWx);
}

function* getLatestWx(action: ReturnType<typeof actions.getLatestWeatherRequest>){
    // const promise = service().get({url:action.endpointUrl, payload:action.data});

    try {
        const data = yield call(api.getLatestWx, action.data);
        yield put(actions.getLatestWeatherResponse(data));
    }
    catch (e) {
      throw e;
    }

}


// export async function accumulationRuleGet(get: AccumulationRuleGet) {
//     const request: ApiRequest<AccumulationRuleGet> = {
//         url: `${endpoint}/read`,
//         data: get
//     };
//     const response = await ApiService.post<AccumulationRuleGet, GetAccumulationRuleResponse>(request);
//     return response.data.accumulationRule;
// }
