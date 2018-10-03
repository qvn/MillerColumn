import * as React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { data } from "./data";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class Container extends React.Component<{ data }> {
  render() {
    const plants: string[] = data.map(plant => plant.name);

    return (
      <div className="container col-8" id="container">
        <div className="row">
          <Column col_name="Plants" col_rows={plants} />
        </div>
      </div>
    );
  }
}

class Column extends React.Component<{ col_name: string; col_rows: string[] }> {
  constructor(props: { col_name: string; col_rows: string[] }) {
    super(props);
    this.state = {
      title: this.props.col_name,
      rows: this.props.col_rows.map(col_row => <Row row={col_row} />)
    };
  }

  render() {
    return (
      <div className="col-6">
        <div className="font-weight-bold bg-warning">{this.state.title} </div>
        <div className="list-group">{this.state.rows}</div>
      </div>
    );
  }
}

class Row extends React.Component<{ row: string }> {
  constructor(props: { row: string }) {
    super(props);
    this.state = {
      isActive: false,
      item_id: null,
      parent_id: null,
      hasChildren: false,
      childrenCount: 0
    };
  }

  handleClick() {}
  render() {
    return (
      <a href="#" className="list-group-item list-group-item-action">
        {this.props.row}
      </a>
    );
  }
}
type MyProps = { data: string[] = data };
type MyState = { value: string };
class App extends React.Component<MyProps, MyState> {
  constructor(props: MyProps, MyState) {
    super(props);
    this.state = {
      myData: data,
      loading: true
    };
    // fetching data - replace with fetch for production API
  }

  render() {
    // add if statement to intialize container only if data is loaded
    return (
      <div style={styles}>
        <Container data={this.state.myData} />
        <p className="bg-warning" />
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
