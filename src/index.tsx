import * as React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ColumnObject } from './MillerTable/Column';
import { Container } from './MillerTable/Container';
import { Node, Deviation } from './data/scenarioController';

// generating PLant Data
// import { inputdata } from './plantData';
// import { plants_model } from './plantController';
// import { CellObject } from './MillerTable/Cell';
// var instance = new plants_model.Data().deserialize(inputdata);
// var plants: CellObject[] = [];
// for (let plant of instance.plants) {
//   let cell = new CellObject();
//   cell.id = plant.id;
//   cell.content = plant.id + '. ' + plant.name;
//   plants.push(cell);
// }

// var columns: ColumnObject[] = [{title: 'Plant', cells: plants}];

// console.log(columns);

// generate Node data
var node = new Node;
var columns: ColumnObject[] = [
  // node.getNodes()
  node.getColumnObject('Node', node.getNodes())
];

var deviation = new Deviation;
var myDeviations = deviation.getDeviations();
var nodeObjects = node.getNodes();
console.log(deviation.getChildren(nodeObjects[0], myDeviations).length);

// const styles = {
  // fontFamily: 'sans-serif',
  // textAlign: 'center'
// };

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
    <div >
      <div>
        <Container.ReactObject columns={this.state.columns} />
      </div>;
    </div>
  );
}
}
render(<App />, document.getElementById('root'));
