import * as React from 'react';
import { Cell, CellObject } from './Cell';

export class ColumnObject {
  title: string;
  cells: CellObject[];
}

interface ColProps {
  index: number;
  title: string;
  cells: CellObject[];
  column: ColumnObject;
  addNewColumn: Function;
  addChildrenColumn: Function;
}

interface ColState {
  cells: CellObject[];
  // cells: {
  //   // id: number,
  //   // content: string,
  //   cell: CellObject,
  //   isActive: boolean
  // }[];
}

export class Column extends React.Component<ColProps, ColState> {
  constructor(props: ColProps) {
    super(props);
    this.state = {
      // TODO: rethink this! The column passed in can be blank and fail. This create a bug. 
      // Cannot embbed the state to the object since it's really just content. 
      // cells: this.props.cells.map((cell: CellObject) => {return {cell: cell, isActive: false}; })
      cells: this.props.cells
    };
    this.deleteCell = this.deleteCell.bind(this);
    this.addCell = this.addCell.bind(this);
    this.selectCell = this.selectCell.bind(this);
    this.viewCell = this.viewCell.bind(this);
  }

  addCell() {
    var newCell: CellObject = {id: '89', content: 'new Cell', parentId: '', parentTable: '', childrenTable: ''};
    this.setState({
      // cells: this.state.cells.concat({cell: newCell, isActive: false })
      cells: this.props.cells.concat(newCell)
    });
  }

  deleteCell(cell: CellObject) {
    // https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react
    console.log(cell.content);
    var array = [...this.state.cells]; // make a separate copy of the array
    var index = array
      .map(x => {
        return x.id;
      })
      .indexOf(cell.id);
    if (index === -1) {
      console.log('Cell not found');
    } else {
      array.splice(index, 1);
    }
    this.setState({ cells: array });
  }

  selectCell(myCell: CellObject) {
    this.setState({
      cells: this.state.cells.map(cell => {
        // if (cell.cell.id === myCell.id) { cell.isActive = true; } else { cell.isActive = false; }
        return cell;
      })
    });
    this.props.addChildrenColumn(myCell, this.props.index);
  }

  viewCell(myCell: CellObject) {
    console.log('View cell: ', myCell.id);
  }

  render() {
    return (
      <div className="col-4">
        <div>{this.props.column.title}</div>
        <div className="list-group">
          {this.props.cells.map((cell, index) => (
            <Cell 
              key={index} 
              cell={cell} 
              index={index}
              deleteCell={this.deleteCell} 
              selectCell={this.selectCell} 
              // isActive={cell.isActive} 
              viewCell={this.viewCell}
            />
          ))}
        </div>
        <button onClick={this.addCell}>addCell</button>
      </div>
    );
  }
}
