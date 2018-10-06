import * as React from 'react';
import { Column, ColumnObject } from './Column';
import { CellObject } from './Cell';

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
      return myColumn;
    }

    addNewColumn() {
      let newColumn: ColumnObject = this.getNewColumn();
      this.setState(
        {columns: this.props.columns.concat(newColumn)}
      );
    }

    render() {
      return (
        <div className="container col-8 d-flex" id="container">
          <div className="row">
            {this.state.columns.map((column: ColumnObject, index: number) => <Column key={index} column={column} />)}
          </div>
          <button>add col</button>
        </div>
      );
    }
  }
}
