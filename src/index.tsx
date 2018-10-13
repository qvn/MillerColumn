import * as React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ColumnObject } from './MillerTable/Column';
import { Container } from './MillerTable/Container';
import { Node, Controller } from './data/scenarioController';

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
var myController = new Controller;
var columns: ColumnObject[] = [
  // node.getNodes()
  myController.getColumnObject('Node', node.getNodes())
];

// var deviation = new Deviation;
// var myDeviations = deviation.getDeviations();
var nodeObjects = node.getNodes();
// console.log(deviation.getChildren(nodeObjects[0].id, myDeviations).length);
console.log(myController.getChildrenColumnObject('Deviation', nodeObjects[0].id).cells.length);

// const styles = {
  // fontFamily: 'sans-serif',
  // textAlign: 'center'
// };

// TODO: take in only the structure that fits the column, not any
interface AppProps {
  // loading: boolean;
  firstColumn: ColumnObject;
  columns: ColumnObject[];
}

function App(props: AppProps) {
  // add if statement to intialize container only if data is loaded
  return (
    <div >
      <div>
        <Container.ReactObject columns={props.columns} firstColumn={props.firstColumn}/>
      </div>;
    </div>
  );
}
render(<App columns={columns} firstColumn={columns[0]}/>, document.getElementById('root'));
