import { toast } from 'react-toastify';
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
        toast.info(action.data.mag, { delay:10, containerId:'QUAKES', position:toast.POSITION.BOTTOM_CENTER });
    }
    catch (e) {
      toast.error((e as Error).message, { containerId:'MAIN' });
    }
}

