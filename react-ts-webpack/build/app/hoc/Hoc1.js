"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.hoc1 = (W) => {
    return class HOC1 extends React.Component {
        render() {
            let className = '';
            let title = '';
            if (this.props.errors && this.props.errors.hasOwnProperty(this.props.name)) {
                className = 'errorClass';
                const key = this.props.name;
                title = this.props.errors[key];
            }
            let domProps = Object.assign({}, this.props);
            delete domProps.formikProps;
            return (React.createElement("div", { className: className, title: title },
                React.createElement(W, Object.assign({}, domProps))));
        }
    };
};
exports.default = exports.hoc1;
//# sourceMappingURL=Hoc1.js.map