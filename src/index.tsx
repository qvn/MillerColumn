import * as React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { inputdata } from "./data";
import { plants_model } from "./plants_model";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class Container extends React.Component<{ data: Data }> {
  constructor(props: { data: plants_model.Data }) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }
  render() {
    const plants: string[] = this.props.data.plants.map(
      (plant: plants_model.Plant) => plant.name
    );

    return (
      <div className="container col-8" id="container">
        <button>addCol</button>
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
  addRow() {
    this.setState({
      row: this.state.rows.push(<Row row={"new row"} />)
    });
  }

  render() {
    return (
      <div className="col-6">
        <div className="font-weight-bold bg-warning">{this.state.title} </div>
        <div className="list-group">{this.state.rows}</div>
        <button onClick={this.addRow.bind(this)}>addRow</button>
      </div>
    );
  }
}

//TODO: create a row_content class to fill the row
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

  render() {
    return (
      <a href="#" className="list-group-item list-group-item-action">
        {this.props.row}
      </a>
    );
  }
}
var instance = new plants_model.Data().deserialize(inputdata);

class App extends React.Component<any, any> {
  // make rows
  // make columns
  // make container
  constructor(props: any) {
    super(props);
    this.state = { loading: true, data: instance };
    // fetching data - replace with fetch for production API
  }

  render() {
    // add if statement to intialize container only if data is loaded
    return (
      <div style={styles}>
        <Container data={this.state.data} />
        <p className="bg-warning" />
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
