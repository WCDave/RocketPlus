import { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { AgGridReact } from 'ag-grid-react';
import { AgGridReactProps } from 'ag-grid-react/lib/agGridReact';
import * as React from 'react';

interface OwnProps {
  label: string;
  borderColor?: string;
  height?: string | number;
}

export class DaveTable extends React.Component<Partial<AgGridReactProps>& OwnProps> {
  constructor(props:AgGridReactProps&OwnProps) {
    super(props);
  }

  render() {
    const { height, label, borderColor, ...rest } = this.props;
    const layout = height != null ? 'normal' : 'autoHeight';
    const bc = borderColor ? { border: `2px solid ${borderColor}`   }:{};
    const style = { height, width:'100%', ...bc };
    return (
        <div id={label} className="ag-theme-balham" style={ {...style} }>
          <AgGridReact
            domLayout={layout}
            {...rest}
            />
        </div>
    );
  }
}
