import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import { actions, TypeKeys } from './actions';
import * as api from './api';
import { AirportData } from '~/app/api/weathergov/model';

export const sagaWatchers = [watchWeatherRequests, watchStationsRequests];

function* watchWeatherRequests() {
    yield takeLatest(TypeKeys.GET_LATEST_WX_REQUEST, getLatestWx);
}

function* getLatestWx(action: ReturnType<typeof actions.getLatestWeatherRequest>){
    try {
        const data = yield call(api.getLatestWx, action.data);
        yield put(actions.getLatestWeatherResponse(data));
    }
    catch (e) {
      throw e;
    }
}

function* watchStationsRequests() {
  yield takeLatest(TypeKeys.GET_WX_STATIONS_REQUEST, getWxStations);
}

function* getWxStations(action: ReturnType<typeof actions.getWxStationsRequest>){

  try {
    const data:AirportData[] = yield call(api.getStations);
    yield put(actions.getWxStationsResponse(data));
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
