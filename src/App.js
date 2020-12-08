import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import Video from "./routes/Video";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Route path="/" exact={true} component={Home} />
          <Route path="/video/:id/" component={Video} />
        </HashRouter>
      </div>
    );
  }
}

export default App;
