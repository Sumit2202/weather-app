import { Component } from "react";
import loading from "../assests/loading.svg";

class Loading extends Component {
  render() {
    return (
      <div className="flex bg-zumthor items-center justify-center">
        <img src={loading} alt="Loading dots" />
      </div>
    );
  }
}

export default Loading;
