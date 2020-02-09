import { Field } from 'formik';
import { hoc1 } from '../hoc/hoc1';

const  hoc = hoc1(Field );

export { hoc as WrappedField };

