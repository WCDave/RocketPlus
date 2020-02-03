import {
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  IFilterComp,
  RowNode
} from 'ag-grid-community';
import 'ag-grid-community/src/styles/ag-grid.scss';
import { connect, Formik, FormikContext, FormikProps } from 'formik';
import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';
import Select, { OptionsType, ValueType } from 'react-select';
import { Dispatch } from 'redux';
import { actions as usgsActions } from '~/app/api/usgs/actions';
import { Feature, Properties, QuakeData } from '~/app/api/usgs/model';
import { actions } from '~/app/api/weathergov/actions';
import { AirportData, Data } from '~/app/api/weathergov/model';
import { ActionType } from '~/app/axios/action-creator';
import { Child } from '~/app/child';
import { DaveSelect } from '~/app/components/dave-select';
import { DaveTable } from '~/app/components/dave-table';
import { Quakes } from '~/app/components/quakes';
import { AppState } from '~/navigation/types';

interface StateProps {
  rocketData?: object;
  imageData?: any;
  Id?: string;
  text?: string;
  result?: string;
  adj?: string;
  wxData?: Data;
  quakeData?: QuakeData;
  quakeMag: string;
  quakePeriod: string;
  airportData?:AirportData[];
}

interface DispatchProps {
  punt: (id: string) => void;
  wx: (id: string) => void;
  getQuakeData: (search:{mag:string, period:string}) => void;
  getStations: ()=> void;
}

interface ComponentProps extends StateProps, DispatchProps {
  xxx?: string;
}

type OptType = {value:string, label:string};

class RocketData extends React.Component<ComponentProps, StateProps> {
  rocketCountDown: number = null;
  wxCountDown: number = null;
  api: GridApi;
  colApi: any;
  identifier: string = 'kmqs';
  filter?: IFilterComp;

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      rocketData: undefined,
      imageData: undefined,
      Id: 'kmqs',
      quakeMag: 'significant',
      quakePeriod: 'hour'
    };
  }

  componentDidMount() {
    this.props.getQuakeData && this.props.getQuakeData({ mag: this.state.quakeMag, period:this.state.quakePeriod });
    this.props.getStations && this.props.getStations();
    this.rocketData();
    this.rocketCountDown = setInterval(this.rocketData, 10000);

    this.wxdata1();
    this.wxCountDown = setInterval(this.wxdata1, 10000 * 6);
  }

  componentDidUpdate(
    prevProps: Readonly<ComponentProps>,
    prevState: Readonly<StateProps>,
    snapshot?: any
  ): void {
    // if (prevProps.match.params !== this.props.match.params) {
    //     const {Id} = this.props.match.params;
    //     if (Id) {
    //         this.setState({Id}, () => this.wxData());
    //     } else {
    //         this.setState({Id: 'mqs'}, () => this.wxData());
    //     }
    // }

    // if (prevProps.match.params !== this.props.match.params) {
    const { Id } = { Id: 'kmqs' };
    // this.wxData();
    // if (Id) {
    //     this.setState({Id}, () => this.wxData());
    // } else {
    //     this.setState({Id: 'mqs'}, () => this.wxData());
    // }
    // }
  }

  componentWillUnmount(): void {
    this.rocketCountDown = null;
    this.wxCountDown = null;
  }

  setQuakeMag = (vt:ValueType<{label: string, value: string}>) => {
    const qm = vt as {value: string} ;
    this.setState({ quakeMag: qm.value }, ()=> this.getQuakeData());
  };

  setQuakePeriod = (vt:ValueType<{label: string, value: string}>) => {
    const pd = vt as {value: string} ;
    this.setState({ quakePeriod: pd.value }, ()=> this.getQuakeData());
  };

  getQuakeData = ()=> {
    this.props.getQuakeData({ mag: this.state.quakeMag, period: this.state.quakePeriod });
  };

  // wxData = () => {
  //     const xmhr = new XMLHttpRequest();
  //     xmhr.addEventListener("load", (evt: ProgressEvent) => {
  //         const imageUrl = URL.createObjectURL((evt.target as XMLHttpRequest).response);
  //         this.setState({imageData: imageUrl});
  //     });
  //     const time = new Date().getTime();
  //     xmhr.open('GET', `http://localhost:8080/FT2-0.0.1-SNAPSHOT/TestServlet?identifier=${this.state.Id}&x='${time + ''}`, true);
  //     xmhr.setRequestHeader('method', 'GET');
  //     xmhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  //     // xmhr.setRequestHeader('mode','no-cors');
  //     xmhr.responseType = "blob";
  //     xmhr.send(null);
  // }

  wxdata1 = () => {
    const time = `'${new Date().getTime().toString()}'`;
    fetch(
      `http://localhost:8080/FT2-0.0.1-SNAPSHOT/TestServlet?identifier=${
        this.state.Id
      }&x='${time}`
    )
      .then(result => {
        return result.blob();
      })
      .then(file => {
        this.setState({ imageData: URL.createObjectURL(file) });
      })
      .catch(error => {
        console.log(error);
      });
  };

  rocketData = async () => {

    try {
      const response = await fetch(
        'http://localhost:8080/SpringWSProject-0.0.1-SNAPSHOT/rest/rocketData/rd?x=REACT',
        { method: 'GET' }
      );
      const data = await response.json();
      this.setState({ rocketData: data });
    } catch (e) {
      console.log(e);
    }

    // fetch(
    //   'http://localhost:8080/SpringWSProject-0.0.1-SNAPSHOT/rest/rocketData/rd?x=REACT',
    //   { method: 'GET' }
    // )
    //   .then(result => {
    //     return result.json();
    //   })
    //   .then((item: any) => {
    //     this.setState({ rocketData: item });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  onGridReady = (ev: GridReadyEvent) => {
    this.api = ev.api;
    // this.api.forEachNode((node:any,idx:number)=>{
    //     console.log(node);
    //     node.gridApi.startEditingCell({
    //         rowIndex: node.rowIndex,
    //         colKey: 'price'
    //     });
    // })
    this.colApi = ev.columnApi;
    this.api.redrawRows();
    this.api.setAlwaysShowVerticalScroll(true);
    this.filter = this.api.getFilterInstance('parameter');
  };

  getIdent = (ev: React.SyntheticEvent) => {
    this.identifier = (ev.currentTarget as HTMLInputElement).value;
    this.setState({ Id: this.identifier }, () => this.wxdata1());
  };

  filterChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        text:
          ev.currentTarget.value.length > 0 ? ev.currentTarget.value : undefined
      },
      () => {
        this.api.onFilterChanged();
      }
    );
  };

  renderIt = (formProps: FormikProps<any>) => {
    const customStyles = (width = 100, height = 15) => {
      return {
        container: (base: any) => ({
          width,
          ...base,
          display: 'inline-block',
          maxControlHeight: height,
          minHeight: height
        }),
        valueContainer: (base: any) => ({
          ...base,
          maxHeight: height,
          minHeight: height
        })
      };
    };

    // console.log(this.props);
    const { quakeData:{ features }, airportData } = this.props;
    const keys = this.state.rocketData ? Object.keys(this.state.rocketData) : [];
    const rocketDisplay: any = keys.map((item: string) => {
      return {
        parameter: item,
        value: this.state.rocketData[item as keyof object]
      };
    });

    const rocketColDefs = [
      {
        headerName: 'Parameter',
        field: 'parameter',
        resizable: true,
        sortable: true,
        filter: true
      },
      { headerName: 'Value', field: 'value', resizable: true }
    ];
    const imgSrc: string = this.state.imageData;
    // '<img src="data:image/gif;base64,' + xmlhttp.responseText + '"/>';
    const imgURL =
      `http://localhost:8080/FT2-0.0.1-SNAPSHOT/TestServlet?identifier=mqs&x= ${
        new Date().getTime()}`;

    interface FormikPartProps {
      formik: FormikContext<any>;
    }

    const myComponent: React.ComponentType<ICellRendererParams & FormikPartProps> = connect(
      (data: ICellRendererParams & FormikPartProps, ...props) => {
        const isPopup = () => {
          return true;
        };
        // data.node.setRowHeight(50);
        return (
          <div className="row">
            <div className="col-sm-6">
              <Select
                options={[
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                  { label: '3', value: 3 }
                ]}
                value={{ label: '1', value: 1 }}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '25px',
                    height: '25px'
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    minHeight: '25px',
                    height: '25px'
                  }),
                  dropdownIndicator: base => ({
                    minHeight: '25px',
                    height: '25px'
                  })
                }}
              />
            </div>
            <div className="col-sm-6" />
          </div>
        );
      }
    );

    const filterFn =(input:string):OptType[] => {
      return airportData.filter((ad:AirportData)=>{
        return ad.name && ad.name.toLowerCase().includes(input.toLowerCase()) ||
          ad.gps_code && ad.gps_code.toLowerCase() === input.toLowerCase();
      }).map((ad:AirportData)=> {
        // console.log(ad);
        return { value: ad.gps_code, label: `${ad.name}(${ad.gps_code})` };
      });
    };

    const stationChange =(x:OptType)=> this.setState({ Id:x.value });
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-6">
              <DaveTable
                label="rocket"
                alwaysShowVerticalScroll
                pagination
                onGridReady={this.onGridReady}
                // onRowClicked={this.onRowClicked}
                rowData={rocketDisplay}
                isFullWidthCell={(node: RowNode) => {
                  return node.data.parameter === 'refName';
                }}
                fullWidthCellRenderer="refCellRenderer"
                columnDefs={rocketColDefs}
                frameworkComponents={{
                  refCellRenderer: myComponent
                }}
                suppressMenuHide
                rowHeight={30}
                gridOptions={{
                  isExternalFilterPresent: () => true,
                  doesExternalFilterPass: node => {
                    if (!this.state.text || this.state.text.length === 0) {
                      return true;
                    }
                    return (
                      node.data.parameter &&
                      node.data.parameter.startsWith(this.state.text)
                    );
                  }
                }}
              />
            </div>

            <div className="col-sm-6">
              <img src={imgSrc} width={700} height={700} />
            </div>
          </div>
          <div id="yyy" className="row">
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-6">
                  <input id="x" type="text" onBlur={this.getIdent} />
                </div>
                <div className="col-sm-6">
                  <DaveSelect<OptType> isAsync filterFn={filterFn}
                                       onChange={stationChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <Child x={this.state.Id} {...this.props} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <Quakes {...this.props} {...this.state.quakeMag} {...this.state.quakePeriod}
                      onQuakePeriodChange={this.setQuakePeriod}
                      onQuakeMagChange={this.setQuakeMag}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <Formik
        initialValues={{ zzz: 'qzzzqq', yyy: 'yyy', xxx: false }}
        render={this.renderIt}
        onSubmit={() => {
        }}
      />

    );
  }
}

function mapStateToProps(state: AppState): Partial<StateProps> {
  return {
    result: state.sampleReducer,
    adj: state.adjuster,
    wxData: state.wx,
    quakeData: state.quakeData.entity,
    airportData: state.airportData.entity
  };
}

function mapDispatchToProps(dispatch: Dispatch<ActionType>): DispatchProps {
  return {
    punt: (id: string) => {
      dispatch({ id, type: 'XD' });
    },
    wx: (id: string) => {
      dispatch(actions.getLatestWeatherRequest(id));
    },
    getQuakeData: (search:{mag:string, period:string})=> {
      dispatch(usgsActions.getQuakeRequest(search));
    },
    getStations: ()=> {
      dispatch(actions.getWxStationsRequest());
    }
  };
}


const connected = reduxConnect(
  mapStateToProps,
  mapDispatchToProps
)(RocketData);

export { connected as RocketData };

