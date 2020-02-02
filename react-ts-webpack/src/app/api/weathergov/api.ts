import { StationsService, WxApiService } from '../../axios/service';
import {AirportData, Data} from './model';

export async function getLatestWx(search: string): Promise<Data> {
    const request = {
        url: `/stations/${search}/observations/latest`,
        payload: { id: search }
    };
    const response = await WxApiService.get<Data>(request);
    if (response.status !== 200) {
        throw response.data;
    }
    return response.data;
}

export async function getStations():Promise<AirportData> {
  const request = {
    url: `/core/airport-codes/airport-codes_json/data/2e2089554f1ffb1103179fa79b9eade8/airport-codes_json.json`
  }
  const response = await StationsService.get<any>(request);
  return response.data;
}

