import * as React from 'react';
import Select, { OptionsType, Props } from 'react-select';
import AsyncSelect, { Props as AsyncProps } from 'react-select/async';

interface OwnProps<T> {
  label: string;
  isAsync: boolean;
  filterFn: (input:string)=>T[];
}

type ComponentProps<T> = Partial<Props<T>> & Partial<OwnProps<T>> & Partial<AsyncProps<T>>;

export class DaveSelect<T> extends React.PureComponent<ComponentProps<T>>  {
  constructor(props:Partial<Props<T>> & OwnProps<T>) {
    super(props);
  }

  render() {
    const { isAsync, options, filterFn, ...rest } = this.props;
    if(!isAsync) {
      return (
        <Select<T> {...rest} options={options} />
      );
    }
    const loadOptions = (inputValue:string) =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(filterFn(inputValue));
        }, 1000);
      });
    return (
      <AsyncSelect<T> {...rest} loadOptions={loadOptions} />
    );
  }
}
