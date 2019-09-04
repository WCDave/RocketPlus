import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Play from './components/play';
// import {  } from './components/Hello';
import RocketData from "./components/rocket-data";
import {RouteComponentProps} from "react-router";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import configureStore from './configureStore';
import adjuster from "./DelayReducer";
import {Provider} from "react-redux";
import './index.css';
// ReactDOM.render(<Hello compiler="Typescript" framework="React" bundler="Webpack" />,
// history={{location:{pathname:'', search:'', state:'', hash:'', },length:0, action:undefined }}

const middleWare = [];
middleWare.push(thunk);
const loggerMiddleware = createLogger({
    predicate: () => (true),
    diff:true
}) ;
middleWare.push(loggerMiddleware)


const store =  configureStore({sampleReducer:'root'});
// var store =  createStore(combineReducers({delay:adjuster}), /* preloadedState, */
//     (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middleWare));
ReactDOM.render(
    <Provider store={store}>
        <Play x="xxxx"/>
    </Provider>
    ,
document.getElementById('root'));
