"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Hello extends React.Component {
    render() {
        return React.createElement("h1", null,
            "This is a ",
            this.props.framework,
            " application using    ",
            this.props.compiler,
            " with ",
            this.props.bundler);
    }
}
exports.Hello = Hello;
//# sourceMappingURL=Hello.js.map