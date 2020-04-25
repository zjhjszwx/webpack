import React from "react";
import ReactDOM from "react-dom";
import logo from "../images/node.png";
import "./search.less";
import sum from "num-add-zjh";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Text: null,
    };
  }
  load() {
    import("./text.js").then((text) => {
      this.setState({
        Text: text.default,
      });
    });
  }
  render() {
    const { Text } = this.state;
    console.log("search", Text, sum(1, 2));

    return (
      <div className="search-text">
        <img src={logo} />
        1232
        <button onClick={this.load.bind(this)}>懒加载</button>
        {Text ? <Text /> : null}
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
