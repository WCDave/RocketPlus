"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WrappedField_1 = require("./WrappedField");
class TestComponent extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(WrappedField_1.default, Object.assign({ name: 'testText' }, this.props))));
    }
}
exports.default = TestComponent;
//# sourceMappingURL=TestComponent.js.map