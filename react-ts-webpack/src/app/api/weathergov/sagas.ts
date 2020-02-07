import { toast } from 'react-toastify';
import { call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { AirportData } from '~/app/api/weathergov/model';
import { actions, TypeKeys } from './actions';
import * as api from './api';

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
      toast(e);
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
    toast(e);
  }

}
