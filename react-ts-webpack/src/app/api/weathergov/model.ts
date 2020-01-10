export interface Data {
    "@context": Array<ContextClass | string>;
    id:         string;
    type:       string;
    geometry:   Geometry;
    properties: Properties;
}

export interface ContextClass {
    wx:               string;
    s:                string;
    geo:              string;
    unit:             string;
    "@vocab":         string;
    geometry:         Distance;
    city:             string;
    state:            string;
    distance:         Distance;
    bearing:          Bearing;
    value:            Value;
    unitCode:         Distance;
    forecastOffice:   Bearing;
    forecastGridData: Bearing;
    publicZone:       Bearing;
    county:           Bearing;
}

export interface Bearing {
    "@type": string;
}

export interface Distance {
    "@id":   string;
    "@type": string;
}

export interface Value {
    "@id": string;
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    "@id":                     string;
    "@type":                   string;
    elevation:                 Elevation;
    station:                   string;
    timestamp:                 Date;
    rawMessage:                string;
    textDescription:           string;
    icon:                      string;
    presentWeather:            any[];
    temperature:               PhysicalValue;
    dewpoint:                  PhysicalValue;
    windDirection:             PhysicalValue;
    windSpeed:                 PhysicalValue;
    windGust:                  PhysicalValue;
    barometricPressure:        PhysicalValue;
    seaLevelPressure:          PhysicalValue;
    visibility:                PhysicalValue;
    maxTemperatureLast24Hours: PhysicalValue;
    minTemperatureLast24Hours: PhysicalValue;
    precipitationLastHour:     PhysicalValue;
    precipitationLast3Hours:   PhysicalValue;
    precipitationLast6Hours:   PhysicalValue;
    relativeHumidity:          PhysicalValue;
    windChill:                 PhysicalValue;
    heatIndex:                 PhysicalValue;
    cloudLayers:               CloudLayer[];
    [key:string]:              any;
}

export interface PhysicalValue {
    value:          number | null;
    unitCode:       string;
    qualityControl: QualityControl | null;
}

export enum QualityControl {
    QcC = "qc:C",
    QcV = "qc:V",
    QcZ = "qc:Z",
}

export interface CloudLayer {
    base:   Elevation;
    amount: string;
}

export interface Elevation {
    value:    number | null;
    unitCode: string;
}
