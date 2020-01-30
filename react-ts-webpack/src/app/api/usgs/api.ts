import { USGSApiService } from '../../axios/service';
import { SigQuake } from './model';

export async function getQuake(search: {mag:string, period:string}): Promise<SigQuake> {
    const request = {
      url: `earthquakes/feed/v1.0/summary/${search.mag}_${search.period}.geojson`
    };
    const response = await USGSApiService.get<SigQuake>(request);
    if (response.status !== 200) {
        throw response.data;
    }
    return response.data;
}

