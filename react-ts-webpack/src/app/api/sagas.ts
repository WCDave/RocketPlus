import {sagaWatchers} from '~/app/api/weathergov/sagas';
import { sagaWatchers as usgsSagaWatchers } from '~/app/api/usgs/sagas';

export const apiSagaWatchers = [...sagaWatchers, ...usgsSagaWatchers]
