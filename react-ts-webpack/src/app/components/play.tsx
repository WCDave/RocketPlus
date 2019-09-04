import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
    Formik,
    Field,
    Form,
    ErrorMessage,
    FieldProps,
    FormikFormProps,
    FieldArray,
    FormikProps,
    FieldArrayRenderProps
} from "formik";
import * as Yup from 'yup';
import {getWeather} from '../../action/Actions';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import {SyntheticEvent} from "react";
import 'react-datepicker/dist/react-datepicker.min.css';
import {Moment} from "moment";
import WrappedField from "./WrappedField";
import Select from "react-select";
import {ValueType} from "react-select/lib/types";


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
    }

    render() {
        return (
            <div>
                {this.props.x}
            </div>
        )
    }
}

const mapStateToProps = (state:any,props:any)=> {
    return {
        result:state.sampleReducer
    }
}


function mapDispatchToProps  (dispatch:Dispatch<any>,ownProps:any):any {
    return {
        punt: (id:string) => {
            dispatch({type: 'X', id});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);
