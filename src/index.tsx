import * as React from "react";
import { render } from "react-dom";
import Hello from "./Hello";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
const Container = props => {
  return (
    <div>
      <div>Plants</div>
      Container
    </div>
  );
};
const App = () => (
  <div style={styles}>
    <Container />
  </div>
);

render(<App />, document.getElementById("root"));
