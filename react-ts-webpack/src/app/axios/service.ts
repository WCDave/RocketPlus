import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import * as https from "https";


class AxiosService {
    private client: AxiosInstance;
    // private serviceInfo: ApiServiceInfo;
    private errorNotificationOptions: NotificationOptions | undefined;

    constructor(config: AxiosRequestConfig) {
        this.client = axios.create(config);

            this.client.interceptors.request.use(request => {
                console.log('Starting Request', request);
                return request;
            });

        this.client.interceptors.response.use(response => {
                console.log('Response:', response);
                return response;
            });

    }

    get<Response = any>(request: {url:string, payload?:any}): AxiosPromise<Response> {
        const { url, payload } = request;
        const data = this.client.get( url);
        return data;
    }

    getHttps<Reponse=any>(request: {url:string, payload?:any}): any {
      const { url, payload } = request;
      return this.client.get( `https://pkgstore.datahub.io/core/airport-codes/airport-codes_json/data/2e2089554f1ffb1103179fa79b9eade8/airport-codes_json.json`);
    }


 // request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R>;
    // request()

}

export const serviceCreator = (config: AxiosRequestConfig) => {
  return new AxiosService(config);
};



const wxService = serviceCreator({
  baseURL:'https://api.weather.gov',
  headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }});

const usgsService = serviceCreator({
  baseURL:'https://earthquake.usgs.gov/',
  headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }});

const stationsService = serviceCreator({
  baseURL:'https://pkgstore.datahub.io',
  headers:{
    Accept: 'application/json',
  }
});

export { wxService as WxApiService };

export { usgsService as USGSApiService };

export { stationsService as StationsService}
