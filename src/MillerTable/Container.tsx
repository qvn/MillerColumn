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
      };
      // this.addNewColumn = this.addNewColumn.bind(this);
      this.addChilrenColumn = this.addChilrenColumn.bind(this);
      this.deleteColumn = this.deleteColumn.bind(this);
    }

    // TODO: add column if row is selected
    // getNewColumn(
    //   childrenTable?: string,
    //   parentId?: string,
    // ): ColumnObject {
    //   var myCells = ['1', '2', '3', '4'].map(item => {
    //     var newRow: CellObject = {
    //       id: item,
    //       content: 'content',
    //       parentId: '',
    //       parentTable: '',
    //       childrenTable: ''
    //     };
    //     return newRow;
    //   });
    //   var myColumn: ColumnObject = {
    //     id: guid(),
    //     title: 'new column' + Math.floor(Math.random() * 123),
    //     cells: myCells
    //   };
    //   console.log('myNew Column', myColumn);
    //   return myColumn;
    // }

    // addNewColumn(newColumn?: ColumnObject) {
    //   // addNewcolumn() {
    //   // var newcolumn: columnobject = this.getnewcolumn();
    //   // // if (newcolumn === undefined) { newcolumn = this.getnewcolumn(); }
    //   // this.setstate(
    //   //   {columns: this.state.columns.concat(newcolumn)}
    //   // );
    // }

    deleteColumn() {
      var newColumns: ColumnObject[] = [...this.state.columns];
      newColumns = newColumns.slice(0, this.state.columns.length - 1);
      this.setState(
        {columns: newColumns}
      );
    }
    // TODO: Passing column index seems clunky
    addChilrenColumn(cell: CellObject, columnIndex: number) {
      this.setState(function(state: ContainerStates, props: ContainerProps) { 
        var newColumn = myController.getChildrenColumnObject(cell.childrenTable, cell.id);
        return {
          columns: state.columns.slice(0, Math.max(columnIndex + 1, 1)).concat(newColumn)
        };
      });
    }
    // note: key must use the ID so that component understands it will refresh upon a new key (sever returns a new Id, whcih trigger the refresh of 
    // compoeent). This is a potential bug where the ID returned is identical to previous Id. However, this is not expected each ID should be the ID
    // of the parent from selected element, which would be different for all element.
    render() {
      return (
        <div className="container" id="container">
          {/* <button onClick={this.addNewColumn}>add col</button> */}
          <div className="row d-flex max-height-100">
            {this.state.columns.map((column: ColumnObject, index: number) => 
              <Column 
                key={column.id} 
                index={index}
                column={column} 
                cells={column.cells}
                title={column.title}
                // addNewColumn={this.addNewColumn} 
                addChildrenColumn={this.addChilrenColumn}
              />)
            }
          </div>
        </div>
      );
    }
  }
}
