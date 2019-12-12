import {
  ErrorMessage,
  Field,
  FieldArray,
  FieldArrayRenderProps,
  FieldProps
} from 'formik';
import { Moment } from 'moment';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import WrappedField from './wrapped-field';

declare type ComponentProps = Props;

interface Props {
  compiler: string;
  framework: string;
  bundler: string;
  formikProps?: any;
  result?: any;
}

// interface FunctionProps {
//     punt: (id:string)=>void;
// }

const aDate = (props: FieldProps) => (
  <DatePicker
    onChange={(date: Moment) => {
      props.form.setFieldValue(props.field.name, date);
    }}
    selected={props.form.values[props.field.name]}
  />
);

const faComp = (props: FieldArrayRenderProps) => (
  <div>
    {props.form.values.fa.map((item: any, idx: any) => {
      return <div key={idx}>{item.value}</div>;
    })}
  </div>
);

const selectOptions: ValueType<{ value: string; label: string }>[] = [
  { value: 'a', label: 'a' },
  { value: 'b', label: 'b' },
  { value: 'c', label: 'c' }
];

const customSelect = (props: FieldProps) => (
  <Select
    onChange={(opt: ValueType<{ value: string; label: string }>, at) => {
      props.form.setFieldValue(props.field.name, opt);
    }}
    value={props.form.values[props.field.name]}
    options={selectOptions}
    onInputChange={x => {
      const hh = 0;
    }}
  />
);

export default class Hello extends React.Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = { name: '', password: '' };
  }

  testIt = () => {
    console.log('test');
  };

  render() {
    return (
      <div>
        <WrappedField name="aDate" component={aDate} {...this.props} />
        <Field name="bDate" component={aDate} />
        {/*<ErrorMessage name='bDate'/>*/}
        <Field name="email" type="email" />
        <Field name="password" />
        <Field name="chk" type="checkbox" />
        <ErrorMessage name="password" />
        <Field name="selectTest" component={customSelect} />
        <ErrorMessage
          name="selectTest"
          render={msg => {
            return <div>{msg}</div>;
          }}
        />
        HELLO
        <FieldArray name="fa" component={faComp} />
      </div>
    );
  }
}

// const mapStateToProps = (state:any,props:any)=> {
//     return {
//         result:state.delay.result
//     }
// }
//
//
// function mapDispatchToProps  (dispatch:Dispatch<any>,ownProps:IProps):FunctionProps {
//     return {
//         punt: (id:string) => {
//             dispatch({type: 'X', id});
//         }
//     }
// }
//
// export default connect<{}, FunctionProps,IProps>(mapStateToProps, mapDispatchToProps)(Hello);
