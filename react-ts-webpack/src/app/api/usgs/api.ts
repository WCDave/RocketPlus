import { USGSApiService } from '../../axios/service';
import { SigDay } from './model';

export async function getSigDay(search: string): Promise<SigDay> {
    const request = {
        url: `/earthquakes/feed/v1.0/summary/significant_day.geojson`,
        payload: { id: search }
    };
    const response = await USGSApiService.get<SigDay>(request);
    if (response.status !== 200) {
        throw response.data;
    }
    return response.data;
}

