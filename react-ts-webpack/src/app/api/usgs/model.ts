export interface SigDay {
  type:     string;
  metadata: Metadata;
  features: Feature[];
}

export interface Feature {
  type:       string;
  properties: Properties;
  geometry:   Geometry;
  id:         string;
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface Properties {
  mag:     number;
  place:   string;
  time:    number;
  updated: number;
  tz:      number;
  url:     string;
  detail:  string;
  felt:    number;
  cdi:     number;
  mmi:     number;
  alert:   string;
  status:  string;
  tsunami: number;
  sig:     number;
  net:     string;
  code:    string;
  ids:     string;
  sources: string;
  types:   string;
  nst:     null;
  dmin:    number;
  rms:     number;
  gap:     number;
  magType: string;
  type:    string;
  title:   string;
}

export interface Metadata {
  generated: number;
  url:       string;
  title:     string;
  status:    number;
  api:       string;
  count:     number;
}

export interface SigDayDetail {
  type:       string;
  properties: SigDayDetailProperties;
  geometry:   Geometry;
  id:         string;
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface SigDayDetailProperties {
  mag:      number;
  place:    string;
  time:     number;
  updated:  number;
  tz:       number;
  url:      string;
  felt:     number;
  cdi:      number;
  mmi:      number;
  alert:    string;
  status:   string;
  tsunami:  number;
  sig:      number;
  net:      string;
  code:     string;
  ids:      string;
  sources:  string;
  types:    string;
  nst:      null;
  dmin:     number;
  rms:      number;
  gap:      number;
  magType:  string;
  type:     string;
  title:    string;
  products: Products;
}

export interface Products {
  dyfi:              Dyfi[];
  "finite-fault":    FiniteFault[];
  "general-text":    GeneralText[];
  geoserve:          Geoserve[];
  "ground-failure":  GroundFailure[];
  "impact-link":     ImpactLink[];
  losspager:         Dyfi[];
  "losspager-admin": Dyfi[];
  "moment-tensor":   MomentTensor[];
  origin:            Origin[];
  "phase-data":      PhaseDatum[];
  shakemap:          Shakemap[];
}

export interface Dyfi {
  indexid:         string;
  indexTime:       number;
  id:              string;
  type:            string;
  code:            string;
  source:          string;
  updateTime:      number;
  status:          string;
  properties:      DyfiProperties;
  preferredWeight: number;
  contents:        { [key: string]: Content };
}

export interface Content {
  contentType:  string;
  lastModified: number;
  length:       number;
  url?:         string;
  bytes?:       string;
}

export interface DyfiProperties {
  depth:                string;
  eventsource:          string;
  eventsourcecode:      string;
  eventtime:            Date;
  latitude:             string;
  longitude:            string;
  magnitude:            string;
  maxmmi:               string;
  "num-responses"?:     string;
  numResp?:             string;
  "pdl-client-version": string;
  alertlevel?:          string;
  "review-status"?:     string;
  renotify?:            string;
}

export interface FiniteFault {
  indexid:         string;
  indexTime:       number;
  id:              string;
  type:            string;
  code:            string;
  source:          string;
  updateTime:      number;
  status:          string;
  properties:      FiniteFaultProperties;
  preferredWeight: number;
  contents:        { [key: string]: Content };
}

export interface FiniteFaultProperties {
  "average-rise-time":        string;
  "average-rupture-velocity": string;
  depth:                      string;
  "derived-magnitude":        string;
  "derived-magnitude-type":   string;
  eventsource:                string;
  eventsourcecode:            string;
  eventtime:                  Date;
  "hypocenter-x":             string;
  "hypocenter-z":             string;
  latitude:                   string;
  location:                   string;
  longitude:                  string;
  "maximum-frequency":        string;
  "maximum-rise":             string;
  "maximum-slip":             string;
  "minimum-frequency":        string;
  "model-dip":                string;
  "model-length":             string;
  "model-rake":               string;
  "model-strike":             string;
  "model-top":                string;
  "model-width":              string;
  "number-longwaves":         string;
  "number-pwaves":            string;
  "number-shwaves":           string;
  "pdl-client-version":       string;
  "review-status":            string;
  "scalar-moment":            string;
  "segment-1-dip":            string;
  "segment-1-strike":         string;
  segments:                   string;
  "subfault-1-area":          string;
  "subfault-1-length":        string;
  "subfault-1-width":         string;
  "time-windows":             string;
  "velocity-function":        string;
}

export interface GeneralText {
  indexid:         string;
  indexTime:       number;
  id:              string;
  type:            string;
  code:            string;
  source:          string;
  updateTime:      number;
  status:          string;
  properties:      GeneralTextProperties;
  preferredWeight: number;
  contents:        GeneralTextContents;
}

export interface GeneralTextContents {
  "": Content;
}

export interface GeneralTextProperties {
  eventsource:          string;
  eventsourcecode:      string;
  "pdl-client-version": string;
  "review-status":      string;
}

export interface Geoserve {
  indexid:         string;
  indexTime:       number;
  id:              string;
  type:            string;
  code:            string;
  source:          string;
  updateTime:      number;
  status:          string;
  properties:      GeoserveProperties;
  preferredWeight: number;
  contents:        GeoserveContents;
}

export interface GeoserveContents {
  "geoserve.json": Content;
}

export interface GeoserveProperties {
  eventsource:          string;
  eventsourcecode:      string;
  location:             string;
  "pdl-client-version": string;
  tsunamiFlag:          string;
  utcOffset:            string;
}

export interface GroundFailure {
  indexid:         string;
  indexTime:       number;
  id:              string;
  type:            string;
  code:            string;
  source:          string;
  updateTime:      number;
  status:          string;
  properties:      GroundFailureProperties;
  preferredWeight: number;
  contents:        { [key: string]: Content };
}

export interface GroundFailureProperties {
  depth:                                     string;
  eventsource:                               string;
  eventsourcecode:                           string;
  eventtime:                                 Date;
  "landslide-alert":                         string;
  "landslide-hazard-alert-color":            string;
  "landslide-hazard-alert-parameter":        string;
  "landslide-hazard-alert-value":            string;
  "landslide-maximum-latitude":              string;
  "landslide-maximum-longitude":             string;
  "landslide-minimum-latitude":              string;
  "landslide-minimum-longitude":             string;
  "landslide-overlay":                       string;
  "landslide-population-alert-color":        string;
  "landslide-population-alert-parameter":    string;
  "landslide-population-alert-value":        string;
  latitude:                                  string;
  "liquefaction-alert":                      string;
  "liquefaction-hazard-alert-color":         string;
  "liquefaction-hazard-alert-parameter":     string;
  "liquefaction-hazard-alert-value":         string;
  "liquefaction-maximum-latitude":           string;
  "liquefaction-maximum-longitude":          string;
  "liquefaction-minimum-latitude":           string;
  "liquefaction-minimum-longitude":          string;
  "liquefaction-overlay":                    string;
  "liquefaction-population-alert-color":     string;
  "liquefaction-population-alert-parameter": string;
  "liquefaction-population-alert-value":     string;
  longitude:                                 string;
  magnitude:                                 string;
  "maximum-latitude":                        string;
  "maximum-longitude":                       string;
  "minimum-latitude":                        string;
  "minimum-longitude":                       string;
  "pdl-client-version":                      string;
  "rupture-warning":                         string;
  "shakemap-version":                        string;
  version:                                   string;
}

export interface ImpactLink {
  indexid:         string;
  indexTime:       number;
  id:              string;
  type:            string;
  code:            string;
  source:          string;
  updateTime:      number;
  status:          string;
  properties:      ImpactLinkProperties;
  preferredWeight: number;
  contents:        any[];
}

export interface ImpactLinkProperties {
  "addon-code":    string;
  "addon-type":    string;
  eventsource:     string;
  eventsourcecode: string;
  text:            string;
  url:             string;
  version:         string;
}

export interface MomentTensor {
  indexid:         string;
  indexTime:       number;
  id:              string;
  type:            string;
  code:            string;
  source:          string;
  updateTime:      number;
  status:          string;
  properties:      MomentTensorProperties;
  preferredWeight: number;
  contents:        MomentTensorContents;
}

export interface MomentTensorContents {
  "contents.xml": Content;
  "quakeml.xml":  Content;
}

export interface MomentTensorProperties {
  "beachball-source":       string;
  depth:                    string;
  "derived-depth":          string;
  "derived-eventtime":      Date;
  "derived-latitude":       string;
  "derived-longitude":      string;
  "derived-magnitude":      string;
  "derived-magnitude-type": string;
  "evaluation-status":      string;
  eventParametersPublicID:  string;
  eventsource:              string;
  eventsourcecode:          string;
  eventtime:                Date;
  latitude:                 string;
  longitude:                string;
  "n-axis-azimuth":         string;
  "n-axis-length":          string;
  "n-axis-plunge":          string;
  "nodal-plane-1-dip":      string;
  "nodal-plane-1-rake":     string;
  "nodal-plane-1-strike":   string;
  "nodal-plane-2-dip":      string;
  "nodal-plane-2-rake":     string;
  "nodal-plane-2-strike":   string;
  "p-axis-azimuth":         string;
  "p-axis-length":          string;
  "p-axis-plunge":          string;
  "pdl-client-version":     string;
  "percent-double-couple":  string;
  "quakeml-publicid":       string;
  "review-status":          string;
  "scalar-moment":          string;
  "sourcetime-decaytime":   string;
  "sourcetime-duration":    string;
  "sourcetime-risetime":    string;
  "sourcetime-type":        string;
  "t-axis-azimuth":         string;
  "t-axis-length":          string;
  "t-axis-plunge":          string;
  "tensor-mpp":             string;
  "tensor-mrp":             string;
  "tensor-mrr":             string;
  "tensor-mrt":             string;
  "tensor-mtp":             string;
  "tensor-mtt":             string;
}

export interface Origin {
  indexid:         string;
  indexTime:       number;
  id:              string;
  type:            string;
  code:            string;
  source:          string;
  updateTime:      number;
  status:          string;
  properties:      OriginProperties;
  preferredWeight: number;
  contents:        OriginContents;
}

export interface OriginContents {
  "contents.xml": Content;
  "quakeml.xml"?: Content;
  "eqxml.xml"?:   Content;
}

export interface OriginProperties {
  "azimuthal-gap"?:              string;
  depth:                         string;
  "depth-type"?:                 string;
  "error-ellipse-azimuth"?:      string;
  "error-ellipse-intermediate"?: string;
  "error-ellipse-major"?:        string;
  "error-ellipse-minor"?:        string;
  "error-ellipse-plunge"?:       string;
  "error-ellipse-rotation"?:     string;
  "evaluation-status"?:          string;
  "event-type":                  string;
  eventParametersPublicID?:      string;
  eventsource:                   string;
  eventsourcecode:               string;
  eventtime:                     Date;
  "eventtime-error"?:            string;
  "horizontal-error"?:           string;
  latitude:                      string;
  "latitude-error"?:             string;
  longitude:                     string;
  "longitude-error"?:            string;
  magnitude:                     string;
  "magnitude-error"?:            string;
  "magnitude-num-stations-used": string;
  "magnitude-source"?:           string;
  "magnitude-type":              string;
  "minimum-distance"?:           string;
  "num-phases-used"?:            string;
  "origin-source"?:              string;
  "pdl-client-version"?:         string;
  "quakeml-magnitude-publicid"?: string;
  "quakeml-origin-publicid"?:    string;
  "quakeml-publicid"?:           string;
  "review-status":               string;
  "standard-error"?:             string;
  "vertical-error"?:             string;
  "cube-location-method"?:       string;
  "cube-magnitude-type"?:        string;
  "depth-method"?:               string;
  "location-method-algorithm"?:  string;
  "location-method-class"?:      string;
  "num-stations-used"?:          string;
  version?:                      string;
}

export interface PhaseDatum {
  indexid:         string;
  indexTime:       number;
  id:              string;
  type:            string;
  code:            string;
  source:          string;
  updateTime:      number;
  status:          string;
  properties:      OriginProperties;
  preferredWeight: number;
  contents:        MomentTensorContents;
}

export interface Shakemap {
  indexid:         string;
  indexTime:       number;
  id:              string;
  type:            string;
  code:            string;
  source:          string;
  updateTime:      number;
  status:          string;
  properties:      ShakemapProperties;
  preferredWeight: number;
  contents:        { [key: string]: Content };
}

export interface ShakemapProperties {
  depth:                   string;
  "event-description":     string;
  "event-type":            string;
  eventsource:             string;
  eventsourcecode:         string;
  eventtime:               Date;
  gmice:                   string;
  latitude:                string;
  longitude:               string;
  magnitude:               string;
  "map-status":            string;
  "maximum-latitude":      string;
  "maximum-longitude":     string;
  maxmmi:                  string;
  "maxmmi-grid":           string;
  maxpga:                  string;
  "maxpga-grid":           string;
  maxpgv:                  string;
  "maxpgv-grid":           string;
  maxpsa03:                string;
  "maxpsa03-grid":         string;
  maxpsa10:                string;
  "maxpsa10-grid":         string;
  maxpsa30:                string;
  "maxpsa30-grid":         string;
  "minimum-latitude":      string;
  "minimum-longitude":     string;
  "pdl-client-version":    string;
  "process-timestamp":     Date;
  "review-status":         string;
  "shakemap-code-version": string;
  version:                 string;
}
