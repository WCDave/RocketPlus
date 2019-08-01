"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Child extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", null,
            "Hello Child",
            this.props.x));
    }
}
exports.default = Child;
//# sourceMappingURL=Child.js.map