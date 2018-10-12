import * as React from 'react';
import { Column, ColumnObject } from './Column';
import { CellObject } from './Cell';
import { Controller } from '../data/scenarioController';

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
      this.addChilrenColumn = this.addChilrenColumn.bind(this);
    }

    // TODO: add column if row is selected
    getNewColumn(
      childrenTable?: string,
      parentId?: string,
    ): ColumnObject {
      var myCells = ['1', '2', '3', '4'].map(item => {
        var newRow: CellObject = {
          id: item,
          content: 'content',
          parentId: '',
          parentTable: '',
          childrenTable: ''
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

    addChilrenColumn(cell: CellObject) {
      var myController = new Controller;
      var newColumn: ColumnObject = myController.getChildrenColumnObject(cell.childrenTable, cell.id);
      console.log('add new column triggered', newColumn, cell);
      // return newColumn;
      this.setState(
        {columns: this.state.columns.concat(newColumn)}
      );
    }

    render() {
      return (
        <div className="container col-8" id="container">
          {/* <button onClick={this.addNewColumn}>add col</button> */}
          <div className="row d-flex">
            {this.state.columns.map((column: ColumnObject, index: number) => 
              <Column 
                key={index} 
                column={column} 
                addNewColumn={this.addNewColumn} 
                addChildrenColumn={this.addChilrenColumn}
              />)
            }
          </div>
        </div>
      );
    }
  }
}
