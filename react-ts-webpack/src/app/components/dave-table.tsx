import { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { AgGridReact } from 'ag-grid-react';
import { AgGridReactProps } from 'ag-grid-react/lib/agGridReact';
import * as React from 'react';

interface OwnProps {
  label: string;
  borderColor?: string;
}

export class DaveTable extends React.Component<Partial<AgGridReactProps>& OwnProps> {

  constructor(props:AgGridReactProps&OwnProps) {
    super(props);
  }

  render() {
    const { domLayout, label, borderColor, ...rest } = this.props;
    const bc = borderColor ? { border: `2px solid ${borderColor}`   }:{};
    const style = { height:'100%', width: '100%', ...bc };
    return (
        <div id={label} className="ag-theme-balham" style={ style }>
          <AgGridReact
            domLayout={domLayout}
            {...rest}
            />
        </div>
    );
  }
}
