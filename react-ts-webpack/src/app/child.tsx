import {AgGridReact} from 'ag-grid-react';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { accessorX } from '~/app/components/accessor1';
import { actions } from './api/weathergov/actions';
import { Data } from './api/weathergov/model';
import { ActionType } from './axios/action-creator';

interface DispatchProps {
  punt: (id: string) => void;
  wx: (id: string) => void;
}

interface StateProps {
  result: string;
  adj: string;
  wxData: Data;
}

interface OwnProps {
  x: string;
}

interface FormProps {
  email: string;
  password: string;
  chk: boolean;
}

interface ComponentProps extends StateProps, OwnProps, DispatchProps {}

class Child extends React.Component<ComponentProps> {
  constructor(props: ComponentProps) {
    super(props);
  }

  componentDidUpdate(
    prevProps: Readonly<DispatchProps & StateProps & OwnProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (this.props.x !== prevProps.x) {
      this.props.wx(this.props.x);
    }
  }

  onClick = (fProps: FormikProps<any>) => (
    ev: React.MouseEvent<HTMLDivElement>
  ) => {
    ev.preventDefault();
    // (ev as Event).stopImmediatePropagation()
    accessorX();
    console.log(fProps);
    console.log(this.props.x);
    this.props.wx(this.props.x);
    this.props.punt('kk');
  };

  renderIt = (formProps: FormikProps<FormProps>) => {
    const { wxData:{ properties } } = this.props;

    const data = properties ? Object.keys(properties).map((key)=>{
      let value = properties[key];
      if(typeof value ==='object' && value !== null){
        // value = value[Object.keys(value)[0]];
        if(key !== 'cloudLayers') {
          value = JSON.stringify(value, null, 2);
        }
      }
      return { key,  value };
    }):[];
    return (
      <Form>
        <div className="dave">
          <AgGridReact
            alwaysShowVerticalScroll
            pagination
            rowData={data}
            getNodeChildDetails={(node: any) => {
              if (node && node.key === 'cloudLayers') {
                return {
                  group: true,
                  expanded: true,
                  children: node.value,
                  key: node.base
                };
              }
              return null;
            }}
            columnDefs={[
              {
                headerName: 'Key',
                field: 'key',
                resizable: true,
                sortable: true,
                filter: true,
                suppressSizeToFit:false
              },
              { headerName: 'Value', field: 'value', resizable: true, suppressSizeToFit:false }
            ]}
          />
        </div>
        <div id="dave" onClick={this.onClick(formProps)}>
          Hello Child{this.props.x}
          <footer>
            <pre>{JSON.stringify(this.props.wxData.properties, null, 2)}</pre>
          </footer>
        </div>
      </Form>
    );
  };

  render() {
    return (
      <Formik
        initialValues={{ email: 'qqq', password: '', chk: false }}
        render={this.renderIt}
        onSubmit={() => {}}
      />
    );
  }
}

function mapStateToProps(state: any): StateProps {
  return {
    result: state.sampleReducer,
    adj: state.adjuster,
    wxData: state.wx
  };
}

function mapDispatchToProps(dispatch: Dispatch<ActionType>): DispatchProps {
  return {
    punt: (id: string) => {
      dispatch({ id, type: 'XD' });
    },
    wx: (id: string) => {
      dispatch(actions.getLatestWeatherRequest(id));
    }
  };
}

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Child);

export { connected as Child };
