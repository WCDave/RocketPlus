'use strict';

import * as _ from 'lodash';


interface StateObject {
    data?:any;
    path?:any;
    url?:any;
    type?:any;
}

export default class ActionCreatorBuilder {

    private _url:string;
    private _actionObj:any;
    private _filter:string;
    private output:any;
    private state:StateObject;
    private _nextAction:any;
    private error:any;

    constructor() {
        this._url='';
        this._actionObj;
        this._filter=null;
        this.output=null;
        this.state=null;
        this._nextAction=null;
    }

    asynch=(url:string, filter:string)=> {
        this._url=url;
        this._filter=filter;
        this._actionObj = null;
        return this;
    };
    path=(path:any)=> {
        this.state.path = path.split('.')[0];
        this.state.type = path.split('.')[1];
        return this;
    };

    synch=()=> {
        this._url = null;
        return this;
    };

    after=(data:any)=>{
        (Object as any).assign( this.state, { after:data } );
        return this;
    };

    before=(data:any)=>{
        (Object as any).assign( this.state, { before:data } );
        return this;
    };

    build() {
        if(this._url) {
            return  this._buildAsynch();
        }
        
            return this._buildSynch();
        
    }

    _buildSynch=()=> {
        return (data:any)=>{
            return(dispatch:any)=> {
                return dispatch({ type:this.state.type, ...data });
            };
        };
    };

    extractKeyValues=(obj:any)=>{
        const values=(Object as any).values(obj);
        const key = Object.keys(obj)[0];
        let result = key+'=';
        if(_.isArray(values)) {
            values.map((item)=>{
                result+=item+',';
            }) ;
            result.substr(0, result.length-2);
        }
        else {
            result += values;
        }
        return result;
    };

    // [{option:v or [v]}]


    _buildAsynch=()=> {
        let urlAppend='';
        if(this._filter) {
            const data = this._filter;
            if(_.isArray(data)) {
                data.map((item)=> {
                    urlAppend = this.extractKeyValues(item);
                });
            }
            else {
                urlAppend = this.extractKeyValues(data);
            }
        }
        if(urlAppend.length) {
            urlAppend = '?'+urlAppend;
        }
        const fetchOptions = { ...{ type:this.state.type, reqTag:'_REQ', respTag:'_REC' } };
        return (urlParams={})=> {
            return (dispatch:any) => {
                dispatch({ type:fetchOptions.type+fetchOptions.reqTag });
                const req = new Request(this._url+urlAppend);
                fetch(req, (fetchOptions as any)).then((result:any) => {
                    if (result.ok) {
                        const _result = result.json();
                        return _result;
                    }
                    
                        this.error = result;
                    
                }).then((item:any) => {
                    let action= { type:fetchOptions.type+fetchOptions.respTag, data:item };
                    action = (Object as any).assign(action, urlParams);
                    dispatch(action);
                });
            };
        };
    };



}
