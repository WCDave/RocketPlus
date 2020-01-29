import { WxApiService } from '../../axios/service';
import { Data } from './model';

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

