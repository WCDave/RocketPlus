import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import { actions, TypeKeys } from './actions';
import * as api from './api';

export const sagaWatchers = [watchUsgsRequests];


function* watchUsgsRequests() {
    yield takeLatest(TypeKeys.GET_QUAKE_REQUEST, getQuake);
}

function* getQuake(action: ReturnType<typeof actions.getQuakeRequest>){
    try {
        const data = yield call(api.getQuake, action.data);
        yield put(actions.getQuakeResponse(data));
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
