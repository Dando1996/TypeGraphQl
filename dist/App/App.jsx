"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const logo_svg_1 = require("../logo.svg");
require("./App.css");
class App extends react_1.Component {
    render() {
        return (<div className="App">
        <header className="App-header">
          <img src={logo_svg_1.default} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>);
    }
}
exports.default = App;
//# sourceMappingURL=App.jsx.map