import * as React from "react";
import { render } from "react-dom";
import data from "data";
import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const Container = props => {
  return (
    <div className="container col-8" id="container">
      <div className="row">
        <Column col_name="Plants" col_rows={[1, 2, 3, 4]} />
        <Column col_name="Units" col_rows={[]} />
      </div>
    </div>
  );
};

const Column = props => {
  return (
    <div className="bg-info col-4">
      <div>{props.col_name} </div>
      <div>{props.col_rows.map(row => <Row {...row} />)}</div>
    </div>
  );
};

const Row = props => {
  return <div>Row</div>;
};

const App = () => (
  <div style={styles}>
    <Container />
  </div>
);

render(<App />, document.getElementById("root"));
