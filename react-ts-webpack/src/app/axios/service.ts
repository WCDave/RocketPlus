import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';


class AxiosService {
    private client: AxiosInstance;
    //private serviceInfo: ApiServiceInfo;
    private errorNotificationOptions: NotificationOptions | undefined;

    constructor(config: AxiosRequestConfig) {
        this.client = axios.create(config);

            this.client.interceptors.request.use(request => {
                console.log('Starting Request', request)
                return request
            })

        this.client.interceptors.response.use(response => {
                console.log('Response:', response)
                return response
            })

    }

    get<Response = any>(request: {url:string, payload:any}): AxiosPromise<Response> {
        const {url, payload} = request;
        return this.client.get( url)
    }

}

export const serviceCreator = () => {
    return new AxiosService({
        baseURL:'https://api.weather.gov',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }});
};


 const service = serviceCreator();

 export {service as ApiService}