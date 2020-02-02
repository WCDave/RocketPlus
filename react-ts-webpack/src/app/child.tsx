import { ValueGetterParams } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/src/styles/ag-theme-balham/sass/ag-theme-balham.scss';
import { AgGridReact } from 'ag-grid-react';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { accessorX } from '~/app/components/accessor1';
import { DaveTable } from '~/app/components/dave-table';
import { actions as usgsActions } from './api/usgs/actions';
import { actions } from './api/weathergov/actions';
import { AirportData, Data } from './api/weathergov/model';
import { ActionType } from './axios/action-creator';


interface OwnProps {
  x: string;
  wxData?: Data;
  getQuakeData?: (search:{mag:string, period:string}) => void;
  wx?: (id: string) => void;
  punt?: (id: string) => void;
  getStations?: ()=> void;
}

interface FormProps {
  email: string;
  password: string;
  chk: boolean;
}

interface ComponentProps extends  OwnProps {}

export class Child extends React.Component<ComponentProps> {
  constructor(props: ComponentProps) {
    super(props);
  }

  componentDidUpdate(
    prevProps: Readonly< OwnProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (this.props.wx && this.props.x !== prevProps.x) {
      this.props.wx(this.props.x);
    }
  }

  componentDidMount(): void {
    // this.props.getStations && this.props.getStations();
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
    const { wxData } = this.props;
    const properties = wxData ? wxData.properties: undefined;

    const data = properties ? Object.keys(properties).map((key)=>{
      let value = properties[key];
      if(typeof value ==='object' && value !== null){
        // value = value[Object.keys(value)[0]];
        if(key !== 'cloudLayers') {
          if(value.hasOwnProperty('value')) {
            value = value.value;
          }
          else {
            value = JSON.stringify(value, null, 2);
          }
        }
      }
      return { key,  value };
    }):[];
    return (
      <Form>
        <div className="row">
          <div className="col-sm-12">
          <DaveTable
            label="child"
            borderColor="red"
            height={400}
            // alwaysShowVerticalScroll
            pagination
            paginationPageSize={26}
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
                suppressSizeToFit:false,
                cellRenderer: 'agGroupCellRenderer'
              },
              { headerName: 'Value', field: 'value', resizable: true, suppressSizeToFit:false,
                valueGetter:(params:ValueGetterParams)=> {
                   if(params.data.value && (Array.isArray(params.data.value) )) {
                     return '';
                   }
                   return params.data.value;
                } },
              { headerName: 'Base', field: 'base.value', resizable: true, suppressSizeToFit:false },
              { headerName: 'Amount', field: 'amount', resizable: true, suppressSizeToFit:false }
            ]}
          />
          </div>
        </div>
        <div className="row">
            <div id="dave"  className="col-sm-12" onClick={this.onClick(formProps)}>
              Hello Child{this.props.x}
                <pre>{JSON.stringify(properties ? properties : {}, null, 2)}</pre>
            </div>
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

// function mapStateToProps(state: any): StateProps {
//   return {
//     result: state.sampleReducer,
//     adj: state.adjuster,
//     wxData: state.wx
//   };
// }
//
// function mapDispatchToProps(dispatch: Dispatch<ActionType>): DispatchProps {
//   return {
//     punt: (id: string) => {
//       dispatch({ id, type: 'XD' });
//     },
//     wx: (id: string) => {
//       dispatch(actions.getLatestWeatherRequest(id));
//     },
//     sigDay: ()=> {
//       dispatch(usgsActions.getSigDayRequest());
//     }
//   };
// }
//
// const connected = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Child);


