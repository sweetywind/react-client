import React, { Component } from "react";

class Video extends Component {
  componentDidMount() {
    console.log(this.props);
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
    }
  }

  render() {
    const { location } = this.props;
    if (location.state) {
      return <p>{location.state.url}</p>;
    } else {
      return null;
    }
  }
}

export default Video;
