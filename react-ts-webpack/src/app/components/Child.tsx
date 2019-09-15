import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {Form, Formik, FormikErrors, FormikFormProps, FormikProps, FormikTouched} from "formik";
import * as moment from "moment";

interface DispatchProps {
    punt:(id:string)=>void;
}

interface StateProps {
    result:string;
    adj:string;
}

interface OwnProps {
  x?:string;
}

class Child extends React.Component<DispatchProps&StateProps&OwnProps> {
    constructor(props:any){
        super(props);
    }

    onClick=(fProps:FormikProps<any>)=>(ev: React.MouseEvent<HTMLDivElement>)=>  {
        ev.preventDefault();
        console.log(fProps) ;
        this.props.punt('kk');
    }

    renderIt=(formProps:FormikProps<any>)=>{
        return (<Form><div id='dave' onClick={this.onClick(formProps)}>Hello Child{this.props.x}</div></Form>);
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
        result:state.sampleReducer,
        adj: state.adjuster
    }
}


function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    return {
        punt: (id:string) => {
            dispatch({type: 'XD', id});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Child);
