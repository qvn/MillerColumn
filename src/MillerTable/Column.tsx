import * as React from 'react';
import { Cell, CellObject } from './Cell';

export class ColumnObject {
  title: string;
  cells: CellObject[];
}

interface ColProps {
  column: ColumnObject;
}
interface ColState {
  title: string;
  cells: {
    // id: number,
    // content: string,
    cell: CellObject
    isActive: boolean
  }[];
}
export class Column extends React.Component<ColProps, ColState> {
  constructor(props: ColProps) {
    super(props);
    this.state = {
      title: props.column.title,
      cells: this.props.column.cells.map((cell: CellObject) => {return {cell: cell, isActive: false}; })
    };
    this.deleteCell = this.deleteCell.bind(this);
    this.addCell = this.addCell.bind(this);
    this.selectCell = this.selectCell.bind(this);
    this.viewCell = this.viewCell.bind(this);
  }

  addCell() {
    var newCell: CellObject = {id: 89, content: 'new Cell'};
    this.setState({
      cells: this.state.cells.concat({cell: newCell, isActive: false })
    });
  }

  deleteCell(cell: CellObject) {
    // https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react
    console.log(cell.content);
    var array = [...this.state.cells]; // make a separate copy of the array
    var index = array
      .map(x => {
        return x.cell.id;
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
        if (cell.cell.id === myCell.id) { cell.isActive = true; } else { cell.isActive = false; }
        return cell;
      })
    });
  }

  viewCell(myCell: CellObject) {
    console.log('View cell: ', myCell.id);
  }

  renderCells() {
    var cells = this.state.cells.map((cell) => (
      <Cell key={cell.cell.id} cell={cell.cell} deleteCell={this.deleteCell} selectCell={this.selectCell} isActive={cell.isActive} viewCell={this.viewCell}/>
    ));
    return cells;
  }

  render() {
    return (
      <div>
        <div>{this.props.column.title}</div>
        <div className="list-group">
          {this.renderCells()}
        </div>
        <button onClick={this.addCell}>addCell</button>
      </div>
    );
  }
}
