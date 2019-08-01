"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ag_grid_react_1 = require("ag-grid-react");
const react_router_dom_1 = require("react-router-dom");
require("bootstrap/dist/css/bootstrap.min.css");
const react_select_1 = require("react-select");
const formik_1 = require("formik");
class RocketData extends React.Component {
    constructor(props) {
        super(props);
        this.rocketCountDown = null;
        this.wxCountDown = null;
        this.identifier = 'mqs';
        this.wxData = () => {
            const xmhr = new XMLHttpRequest();
            xmhr.addEventListener("load", (evt) => {
                const imageUrl = URL.createObjectURL(evt.target.response);
                this.setState({ imageData: imageUrl });
            });
            const time = new Date().getTime();
            xmhr.open('GET', `http://localhost:8080/FT2-0.0.1-SNAPSHOT/TestServlet?identifier=${this.state.Id}&x='${time + ''}`, true);
            xmhr.setRequestHeader('method', 'GET');
            xmhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xmhr.responseType = "blob";
            xmhr.send(null);
        };
        this.rocketData = () => {
            fetch('http://localhost:8080/SpringWSProject-0.0.1-SNAPSHOT/rest/rocketData/rd?x=REACT', { method: 'GET' })
                .then(result => {
                return result.json();
            })
                .then((item) => {
                this.setState({ rocketData: item });
            });
        };
        this.onGridReady = (ev) => {
            this.api = ev.api;
            this.colApi = ev.columnApi;
            this.api.redrawRows();
            this.api.setAlwaysShowVerticalScroll(true);
            this.filter = this.api.getFilterInstance('parameter');
        };
        this.onRowClicked = (x) => {
        };
        this.getIdent = (ev) => {
            this.identifier = ev.currentTarget.value;
            this.setState({ Id: this.identifier }, () => this.wxData());
        };
        this.filterChange = (ev) => {
            this.setState({ text: ev.currentTarget.value.length > 0 ? ev.currentTarget.value : undefined }, () => {
                this.api.onFilterChanged();
            });
        };
        this.state = {
            rocketData: undefined,
            imageData: undefined,
            Id: 'mqs'
        };
    }
    componentDidMount() {
        this.rocketData();
        this.rocketCountDown = setInterval(this.rocketData, 10000);
        this.wxData();
        this.wxCountDown = setInterval(this.wxData, 10000 * 6);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params !== this.props.match.params) {
            const { Id } = this.props.match.params;
            if (Id) {
                this.setState({ Id }, () => this.wxData());
            }
            else {
                this.setState({ Id: 'mqs' }, () => this.wxData());
            }
        }
    }
    componentWillUnmount() {
        this.rocketCountDown = null;
        this.wxCountDown = null;
    }
    render() {
        const customStyles = (width = 100, height = 15) => {
            return {
                container: (base) => (Object.assign({}, base, { display: 'inline-block', width: width, maxControlHeight: height, minHeight: height })),
                valueContainer: (base) => (Object.assign({}, base, { maxHeight: height, minHeight: height }))
            };
        };
        console.log(this.props);
        let keys = this.state.rocketData ? Object.keys(this.state.rocketData) : [];
        let display = keys.map((item) => {
            return { parameter: item, value: this.state.rocketData[item] };
        });
        const coldefs = [
            {
                headerName: "Parameter", field: "parameter", resizable: true, sortable: true, filter: true
            },
            { headerName: "Value", field: "value", resizable: true }
        ];
        const imgSrc = this.state.imageData;
        const imgURL = 'http://localhost:8080/FT2-0.0.1-SNAPSHOT/TestServlet?identifier=mqs&x=' + new Date().getTime() + '';
        const myComponent = formik_1.connect((data, ...props) => {
            const isPopup = () => {
                return true;
            };
            return (React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-sm-6" },
                    React.createElement(react_select_1.default, { options: [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }], value: { label: '1', value: 1 }, styles: { control: (base, _state) => (Object.assign({}, base, { minHeight: '25px', height: '25px' })),
                            valueContainer: (base, _state) => (Object.assign({}, base, { minHeight: '25px', height: '25px' })),
                            dropdownIndicator: (base) => ({ minHeight: '25px', height: '25px' }) } })),
                React.createElement("div", { className: "col-sm-6" })));
        });
        return (React.createElement("div", { className: " ag-theme-blue dave" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-sm-6" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-sm-12" },
                            React.createElement("input", { onChange: this.filterChange }),
                            React.createElement(ag_grid_react_1.AgGridReact, { alwaysShowVerticalScroll: true, pagination: true, onGridReady: this.onGridReady, rowData: display, isFullWidthCell: (node) => {
                                    return node.data.parameter === 'refName';
                                }, fullWidthCellRenderer: 'refCellRenderer', columnDefs: coldefs, frameworkComponents: {
                                    refCellRenderer: myComponent
                                }, suppressMenuHide: true, rowHeight: 30, gridOptions: { isExternalFilterPresent: () => (true),
                                    doesExternalFilterPass: (node) => {
                                        if (!this.state.text || this.state.text.length === 0) {
                                            return true;
                                        }
                                        return node.data.parameter && node.data.parameter.startsWith(this.state.text);
                                    }
                                } }))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-sm-6" },
                            React.createElement("input", { type: "text", onBlur: this.getIdent }),
                            React.createElement(react_router_dom_1.NavLink, { className: "btn-info btn", to: '/test' }, "test")),
                        React.createElement("div", { className: "col-sm-6" },
                            React.createElement(react_router_dom_1.NavLink, { className: "btn-info btn", to: '/formikStuff' }, "formik")))),
                React.createElement("div", { className: "col-sm-6" },
                    React.createElement("img", { src: imgSrc, width: 700, height: 700 })))));
    }
}
exports.default = react_router_dom_1.withRouter(RocketData);
//# sourceMappingURL=rocket-data.js.map