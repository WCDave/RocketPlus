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
  airportData: EntityState<AirportData[]>;
}

export interface EntityState<Entity> {
  status: ApiStatus;
  entity?: Entity;
  error?: Error;
}

export enum ApiStatus {
  Idle = 0,
  Fetching = 1,
  Submitting = 2,
  Success = 3,
  Failure = 4
}
