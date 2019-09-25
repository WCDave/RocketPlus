import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {Form, Formik, FormikErrors, FormikFormProps, FormikProps, FormikTouched} from "formik";
import { accessorX } from '~/app/components/accessor1';
import {actions} from "./api/weathergov/actions";
import {Data} from "./api/weathergov/model";

interface DispatchProps {
    punt:(id:string)=>void;
    wx:(id:string)=>void;
}

interface StateProps {
    result:string;
    adj:string;
    wxData:Data;
}

interface OwnProps {
  x?:string;
}

interface FormProps {
    email:string;
    password:string;
    chk:boolean;
}

class Child extends React.Component<DispatchProps&StateProps&OwnProps> {
    constructor(props:any){
        super(props);

    }

    componentDidUpdate(prevProps: Readonly<DispatchProps & StateProps & OwnProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(this.props.x !== prevProps.x) {
            this.props.wx(this.props.x);
        }
    }

    onClick=(fProps:FormikProps<any>)=>(ev: React.MouseEvent<HTMLDivElement>)=>  {
        ev.preventDefault();
        accessorX();
        console.log(fProps) ;
        console.log(this.props.x) ;
        this.props.wx(this.props.x);
        this.props.punt('kk');
    }

    renderIt=(formProps:FormikProps<FormProps>)=>{
        return (<Form>
            <div id='dave' onClick={this.onClick(formProps)}>Hello Child{this.props.x}
                <footer><pre>{JSON.stringify(this.props.wxData,null,2)}</pre></footer>
            </div>
        </Form>);
    }

    render() {
        return(
        <Formik
            initialValues={{email: 'qqq',password:'',chk:false}}
            render={this.renderIt}
            onSubmit={()=>{}}
        />
        )
    }
}

function mapStateToProps(state: any): StateProps {
    return {
        result: state.sampleReducer,
        adj: state.adjuster,
        wxData: state.wx
    }
}


function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
        punt: (id:string) => {
            dispatch({type: 'XD', id});
        },
        wx: (id:string)=>{
            dispatch(actions.getLatestWeatherRequest(id))
        }
    }
}

const child =  connect(mapStateToProps, mapDispatchToProps)(Child);

export { child as Child };
