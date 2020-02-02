import * as React from 'react';
import { QuakeData } from '~/app/api/usgs/model';
import { AirportData, Data } from '../app/api/weathergov/model';


export interface JsonRoute {
  path:      string;
  exact:     boolean;
  component?: (x?:any)=> React.ReactElement;
  sidebar:    string;
  main:      ()=> string;
  children?:  JsonRoute[];
}

export interface AppState {
  sampleReducer: string;
  adjuster: string;
  wx: Data;
  quakeData: QuakeData;
  airportData: AirportData[];
}
