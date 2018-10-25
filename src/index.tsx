import * as React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from './MillerTable/Container';

function App() {
  // add if statement to intialize container only if data is loaded
  return (
    <Container />
  );
}
render(<App />, document.getElementById('root'));
