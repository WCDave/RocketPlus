import { DaveTable } from "~/app/components/dave-table";
import * as React from "react";
import { Feature, Properties } from "~/app/api/usgs/model";

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

const quakes =(props:any) => {
  const { quakeData:{features}, quakeData } = props;
  const quakeDisplay: Properties[] = features ? features.sort((a:Feature, b:Feature)=> {
    return Number(a.properties.mag) > Number(b.properties.mag) ? -1 : 1;
  }).map((item: Feature) => {
    return item.properties;

  }) : [];
  return (
    <div>
      <DaveTable label="quakes"
                 columnDefs={quakeColDefs}
                 rowData={quakeDisplay}
                 pagination
                 alwaysShowVerticalScroll
      />
      <pre>{JSON.stringify(quakeData, null, 2)}</pre>
    </div>
  )
}

export { quakes as Quakes };
