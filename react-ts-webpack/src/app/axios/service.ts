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
        return this.client.get( url);
    }

    getHttps<Reponse=any>(request: {url:string, payload?:any}): any {
      const { url, payload } = request;
      return this.client.get( url).then(_ => console.log(`${ _ }`)).catch(err=> console.log(err));
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
  baseURL:'https://www.aviationweather.gov',
  headers:{
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
  },
  httpsAgent: new https.Agent({
    host: 'www.aviationweather.gov',
    rejectUnauthorized: false
  })
});

export { wxService as WxApiService };

export { usgsService as USGSApiService };

export { stationsService as StationsService}
