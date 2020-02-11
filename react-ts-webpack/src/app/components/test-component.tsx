import { ErrorMessage, Field } from 'formik';
import * as React from 'react';
import { WrappedField } from './wrapped-field';


export  class TestComponent extends React.Component<any, {}, {}> {
      render() {
          return (
              <div>
                  <WrappedField name="testText" {...this.props} />

              </div>);
      }
}
