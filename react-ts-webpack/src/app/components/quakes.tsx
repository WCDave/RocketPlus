import { DaveTable } from "~/app/components/dave-table";
import * as React from "react";
import { Feature, Properties } from "~/app/api/usgs/model";
import Select from "react-select";
import { OptionsType, ValueType } from "react-select/lib/types";

const quakeColDefs = [
  {
    headerName: 'Title',
    field: 'title',
    resizable: true,
    sortable: true,
    filter: true
  },
  {headerName: 'Magnitude', field: 'mag', resizable: true}
];

const magOptions:OptionsType<{ label: string; value: string }> =  [
  {label: 'Sig', value: 'significant'},
  {label: '4.5+', value: '4.5'},
  {label: '2.5+', value: '2.5'},
  {label: '1.0+', value: '1.0'},
  {label: 'All', value: 'all'}
  ];

const periodOptions:OptionsType<{ label: string; value: string }> =  [
  {label: 'Hour', value: 'hour'},
  {label: 'Day', value: 'day'},
  {label: 'Week', value: 'week'},
  {label: 'Month', value: 'month'}
];

const quakes =(props:any) => {
  const { quakeData:{features}, quakeData } = props;
  const quakeDisplay: Properties[] = features ? features.sort((a:Feature, b:Feature)=> {
    return Number(a.properties.mag) > Number(b.properties.mag) ? -1 : 1;
  }).map((item: Feature) => {
    return item.properties;

  }) : [];
  return (
    <div className="row">
      <div className="col-sm-6">
        <Select id="mag" options={magOptions} defaultValue={{label: 'Sig', value: 'Significant'}}
                onChange={(vt:ValueType<{label:string, value:string}>)=> {
                  props.onQuakeMagChange(vt);
                }}
        />
      </div>
      <div className="col-sm-6">
        <Select id="period" options={periodOptions} defaultValue={{label: 'Hour', value: 'hour'}}
                onChange={(vt:ValueType<{label:string, value:string}>)=> {
                  props.onQuakePeriodChange(vt);
                }}
        />
      </div>
      <div className="row">
        <div className="col-sm-12">
          <DaveTable label="quakes"
                     borderColor="orange"
                     columnDefs={quakeColDefs}
                     rowData={quakeDisplay}
                     pagination
                     alwaysShowVerticalScroll
          />
          <pre>{JSON.stringify(quakeData, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

export { quakes as Quakes };
