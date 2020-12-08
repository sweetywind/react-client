import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Video from "./routes/Video";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/" exact={true} component={Home} />
          <Route path="/video/:id/" component={Video} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
