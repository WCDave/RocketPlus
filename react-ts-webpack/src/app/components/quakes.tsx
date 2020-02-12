import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef';
import * as React from 'react';
import { OptionsType, ValueType } from 'react-select/index';
import { Feature, Properties } from '~/app/api/usgs/model';
import { DaveSelect } from '~/app/components/dave-select';
import { DaveTable } from '~/app/components/dave-table';
import {ToastContainer} from "react-toastify";

const quakeColDefs:ColDef[] = [
  {
    headerName: 'Place',
    field: 'place',
    resizable: true,
    suppressSizeToFit:false,
    sortable: true,
    filter: true
  },
  { headerName: 'Magnitude', field: 'mag', valueFormatter: ((params) => {
    return params.value.toLocaleString(navigator.language,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }) },
  {
    headerName: 'Time',
    field: 'time',
    resizable: true,
    suppressSizeToFit: false,
    sortable: true,
    filter: true,
    valueFormatter: ((params) => {
      const d = new Date(params.value);
      return `${d.toDateString()} ${d.toLocaleTimeString(navigator.language, { hour12:false })}`;
    })
  }
];

type OptType =  {label: string, value: string};

const magOptions:OptionsType<OptType> =  [
  { label: 'Sig', value: 'significant' },
  { label: '4.5+', value: '4.5' },
  { label: '2.5+', value: '2.5' },
  { label: '1.0+', value: '1.0' },
  { label: 'All', value: 'all' }
  ];

const periodOptions:OptionsType<OptType> =  [
  { label: 'Hour', value: 'hour' },
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' }
];


const quakes =(props:any) => {
  const { quakeData, onQuakeMagChange, onQuakePeriodChange } = props;
  const features = quakeData ? quakeData.features: [];
  const quakeDisplay: Properties[] = features ? features.sort((a:Feature, b:Feature)=> {
    return Number(a.properties.mag) > Number(b.properties.mag) ? -1 : 1;
  }).map((item: Feature) => {
    return item.properties;

  }) : [];

  const onMagChange = (vt:ValueType<OptType>)=> {
    onQuakeMagChange(vt);
  };

  const onPeriodChange = (vt:ValueType<OptType>)=> {
    onQuakePeriodChange(vt);
  };
  return (
    <>
    <div className="row">
      <div className="col-sm-6">
        <DaveSelect<OptType> id="mag" options={magOptions} defaultValue={{ label: 'Sig', value: 'Significant' }}
                onChange={onMagChange} isSearchable={false}
        />
      </div>
      <div className="col-sm-6">
        <DaveSelect<OptType> id="period" options={periodOptions} defaultValue={{ label: 'Hour', value: 'hour' }}
                onChange={onPeriodChange} isSearchable={false}
        />
      </div>
    </div>
      <div className="row">
        <div className="col-sm-12">
          <DaveTable label="quakes"
                     borderColor="orange"
                     columnDefs={quakeColDefs}
                     rowData={quakeDisplay}
                     pagination
                     paginationPageSize={12}
                     height={400}
                     alwaysShowVerticalScroll
          />
          <pre>{JSON.stringify(quakeData, null, 2)}</pre>
        </div>
      </div>
      <ToastContainer containerId={'QUAKES'} enableMultiContainer />
      </>
  );
};

export { quakes as Quakes };
