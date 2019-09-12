import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface DispatchProps {
    punt:(id:string)=>void;
}

interface StateProps {
    result:string;
}

interface OwnProps {
  x?:string;
}

class Child extends React.Component<DispatchProps&StateProps&OwnProps> {
    constructor(props:any){
        super(props);
    }

    onClick=(ev: React.MouseEvent<HTMLDivElement>)=> {
        ev.preventDefault();
        this.props.punt('kk');
    }
    render() {
        return (<div id='dave' onClick={this.onClick}>Hello Child{this.props.x}</div>)
    }
}

function mapStateToProps(state: any): StateProps {
    return {
        result:state.sampleReducer
    }
}


function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
        punt: (id:string) => {
            dispatch({type: 'X', id});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Child);
