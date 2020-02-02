import { sagaWatchers as usgsSagaWatchers } from '~/app/api/usgs/sagas';
import { sagaWatchers } from '~/app/api/weathergov/sagas';

export const apiSagaWatchers = [...sagaWatchers, ...usgsSagaWatchers];
