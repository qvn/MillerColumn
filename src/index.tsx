import * as React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ColumnObject } from './MillerTable/Column';
import { Container } from './MillerTable/Container';
import { ScenarioData } from './data/scenarioController';

var data = new ScenarioData;
var nodes = data.getNodes();

interface AppProps {
  // loading: boolean;
  firstColumn: ColumnObject;
}

function App(props: AppProps) {
  // add if statement to intialize container only if data is loaded
  return (
    <Container.ReactObject firstColumn={props.firstColumn}/>
  );
}
render(<App firstColumn={nodes}/>, document.getElementById('root'));
