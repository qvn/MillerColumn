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
    firstColumn: ColumnObject;
  }
  interface ContainerStates {
    columns: ColumnObject[];
    columnsCount: number;
  }

  var myController = new Controller;

  export class ReactObject extends React.Component<
    ContainerProps,
    ContainerStates
  > {
    constructor(props: ContainerProps) {
      super(props);
      this.state = {
        columns: [this.props.firstColumn],
        columnsCount: this.props.columns.length
      };
      this.getNewColumn = this.getNewColumn.bind(this);
      this.addNewColumn = this.addNewColumn.bind(this);
      this.addChilrenColumn = this.addChilrenColumn.bind(this);
      this.deleteColumn = this.deleteColumn.bind(this);
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
        title: 'new column' + Math.floor(Math.random() * 123),
        cells: myCells
      };
      console.log('myNew Column', myColumn);
      return myColumn;
    }

    // addNewColumn(newColumn?: ColumnObject) {
      addNewColumn() {
      var newColumn: ColumnObject = this.getNewColumn();
      // if (newColumn === undefined) { newColumn = this.getNewColumn(); }
      this.setState(
        {columns: this.state.columns.concat(newColumn)}
      );
    }

    deleteColumn() {
      var newColumns: ColumnObject[] = [...this.state.columns];
      newColumns = newColumns.slice(0, this.state.columns.length - 1);
      this.setState(
        {columns: newColumns}
      );
    }

    addChilrenColumn(cell: CellObject, columnIndex: number) {
      console.log(columnIndex);
      this.setState(function(state: ContainerStates, props: ContainerProps) { 
        var newColumn = myController.getChildrenColumnObject(cell.childrenTable, cell.id);
        console.log(newColumn);
        return {
          columns: state.columns.slice(0, Math.max(columnIndex + 1, 1)).concat(newColumn)
        };
      });
    }

    render() {
      return (
        <div className="container" id="container">
          <button onClick={this.addNewColumn}>add col</button>
          <button onClick={this.deleteColumn}>del col</button>
          <div className="row d-flex">
            {this.state.columns.map((column: ColumnObject, index: number) => 
              <Column 
                key={index} 
                index={index}
                column={column} 
                cells={column.cells}
                title={column.title}
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
