import * as React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { inputdata } from './data';
import { plants_model } from './plants_model';
import { ColumnObject } from './MillerTable/Column';
import { CellObject } from './MillerTable/Cell';
import { Container } from './MillerTable/Container';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

var instance = new plants_model.Data().deserialize(inputdata);
var rows: CellObject[] = [];
for (let plant of instance.plants) {
  let row = new CellObject();
  row.id = plant.id;
  row.content = plant.id + '. ' + plant.name;
  rows.push(row);
}
var columns: ColumnObject[] = [];
let column = new ColumnObject();
column.title = 'Plant';
column.cells = rows;
columns.push(column);

console.log(column);
// TODO: take in only the structure that fits the column, not any
interface AppProps {}
interface AppState {
  loading: boolean;
  columns: ColumnObject[];
}
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      loading: true,
      columns: columns
    };
  }
  componentDidMount() {
    console.log('I was triggered during componentDidMount');
  }

  render() {
    // add if statement to intialize container only if data is loaded
    return (
      <div style={styles}>
        <div>
          <Container.ReactObject columns={this.state.columns} />
        </div>;
      </div>
    );
  }
}
render(<App />, document.getElementById('root'));
