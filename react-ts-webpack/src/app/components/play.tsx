import { get } from 'https';
// import { useEffect, useState } from 'react';
import * as React from 'react';
import 'react-datepicker/dist/react-datepicker.min.css';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';


declare type ComponentProps = {x?:string, punt:(id:string)=>void};




class Play extends React.Component<ComponentProps, {}> {

    constructor(props:ComponentProps) {
        super(props);

    }

    componentDidMount(): void {
        this.props.punt('KPHL');
    }

    testIt=()=> {
        console.log('test');
    };



    render() {
        const SomeFunction = (props:any) => {
            const [count, setCount] = React.useState(0);
            React.useEffect(()=>{
                document.title = `Count ${count}`;
                const httpsUrl = 'https://www.aviationweather.gov';
              const httpUrl = 'https://www.aviationweather.gov:443/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=PHTO&hoursBeforeNow=4';
                const headers = [
                  ['Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'],
                  ['Accept-Encoding', 'gzip, deflate, br'],
                  ['Accept-Language', 'en-US,en;q=0.9'],
                  ['Cache-Control', 'no-cache'],
                  ['Connection', 'keep-alive'],
                  ['Cookie', 'PHPSESSID=ojcgk7vmlt7k6qg4d44e0ifcu0; _ga=GA1.2.1774790203.1567611317; _gid=GA1.2.1004859473.1567611317; mapbase=null; mapover=; maindata=fltcat,sigmet,isigmet,cwa,pirep,; metardata=; metaropts=model,0,false,false,false,false,1; mapinfo=84.4110,-126.6631,2'],
                  ['Host', 'www.aviationweather.gov'],
                  ['Pragma', 'no-cache'],
                  ['Sec-Fetch-Mode', 'navigate'],
                  ['Sec-Fetch-Site', 'none'],
                  ['Sec-Fetch-User', '?1'],
                  ['Upgrade-Insecure-Requests', '1'],
                  ['User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36']
                ];
                const response =  get({
                hostname: 'www.aviationweather.gov',
                port: 443,
                path: '/',
                method: 'GET',
              }, (res)=> {
                    console.log(res);
                });
               const x = 6;
            });
            return (
                <div>
                    <button onClick={() => {
                        const x =6;
                        setCount(count + 1);
                    }}>
                        Click me
                    </button>
                    {count}{props.x}
                </div>
            );
        };
        return (
            <div>
                <SomeFunction {...this.props} />
                {this.props.x}


            </div>
        );
    }
}

const mapStateToProps = (state:any, props:any)=> {
    return {
        result:state.sampleReducer
    };
};


function mapDispatchToProps  (dispatch:Dispatch<any>, ownProps:any):any {
    return {
        punt: (id:string) => {
            dispatch({ id, type: 'X' });
        }
    };
}
const play = connect(mapStateToProps, mapDispatchToProps)(Play);
export { play as Play };
