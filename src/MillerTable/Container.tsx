import * as React from 'react';
import { Column, ColumnObject } from './Column';
import { CellObject } from './Cell';

// Data Controller: need to update to call the right controller
// import { DataController } from '../data/scenarioController';
// var controller = new DataController;
// var firstColumn: ColumnObject = DataController.getNodes();

export namespace Container {
  interface ContainerProps {
    columns: ColumnObject[];
  }
  interface ContainerStates {
    columns: ColumnObject[];
  }

  export class ReactObject extends React.Component<
    ContainerProps,
    ContainerStates
  > {
    constructor(props: ContainerProps) {
      super(props);
      this.state = {
        
        columns: this.props.columns
      };
      this.getNewColumn = this.getNewColumn.bind(this);
      this.addNewColumn = this.addNewColumn.bind(this);
    }

    // TODO: add column if row is selected
    getNewColumn(
      parentColumn?: ColumnObject,
      rowSelected?: CellObject
    ): ColumnObject {
      var myCells = [1, 2, 3, 4].map(item => {
        var newRow: CellObject = {
          id: item,
          content: 'content'
        };
        return newRow;
      });
      var myColumn: ColumnObject = {
        title: 'new column',
        cells: myCells
      };
      console.log('myNew Column', myColumn);
      return myColumn;
    }

    addNewColumn() {
      var newColumn: ColumnObject = this.getNewColumn();
      this.setState(
        {columns: this.state.columns.concat(newColumn)}
      );
    }

    render() {
      return (
        <div className="container col-8 d-flex" id="container">
          <div className="row">
            {this.state.columns.map((column: ColumnObject, index: number) => <Column key={index} column={column} />)}
          </div>
          <button onClick={this.addNewColumn}>add col</button>
        </div>
      );
    }
  }
}
