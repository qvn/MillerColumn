import * as React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { data } from "./data";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class Container extends React.Component {
  render() {
    const plants = [];

    this.props.data.forEach(plant => {
      plants.push(<Row row={plant.name} />);
    });

    return (
      <div className="container col-8" id="container">
        <div className="row">
          <Column col_name="Plants" col_rows={plants} />
        </div>
      </div>
    );
  }
}

const Column = props => {
  return (
    <div className="bg-info col-4">
      <div>{props.col_name} </div>
      <div>{props.col_rows.map(row => <Row row={row} />)}</div>
    </div>
  );
};

const Row = props => {
  return <div>{props.row}</div>;
};

const App = () => (
  <div style={styles}>
    <Container data={data} />
  </div>
);

render(<App />, document.getElementById("root"));
