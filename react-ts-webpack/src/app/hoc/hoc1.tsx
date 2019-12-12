import { ErrorMessage, Field, FieldConfig, FieldProps } from 'formik';
import * as React from 'react';

export const hoc1=(W:  React.ComponentType)=> {
    return class HOC1 extends React.Component<any, {}> {

        render() {
         let className = '';
         let title='';
         if(this.props.errors && this.props.errors.hasOwnProperty(this.props.name)) {
             className = 'errorClass';
             const key: string = this.props.name;
             title = this.props.errors[key];
         }
         const domProps:any = { ...this.props };
         delete domProps.formikProps;
         return (<div className={className} title={title}><W {...domProps} /></div>);
        }
    };
};
