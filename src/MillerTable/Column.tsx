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
  cells: CellObject[];
}
export class Column extends React.Component<ColProps, ColState> {
  constructor(props: ColProps) {
    super(props);
    this.state = {
      title: props.column.title,
      cells: props.column.cells,
    };
    this.deleteCell = this.deleteCell.bind(this);
    this.addCell = this.addCell.bind(this);
    this.selectCell = this.selectCell.bind(this);
  }

  addCell() {
    let newCell: CellObject = { id: 89, content: 'new Cell' }; 
    this.setState({
      cells: this.state.cells.concat(newCell)
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

  selectCell(cell: CellObject) {
    console.log('Cell ', cell.id, 'is activated');
    
  }

  render() {
    console.log('renderCell', this.state.cells);
    return (
      <div>
        <div>{this.props.column.title}</div>
        <div className="list-group">
          {this.state.cells.map((cell: CellObject) => (
            <Cell key={cell.id} cell={cell} deleteCell={this.deleteCell} selectCell={this.selectCell}/>
          ))}
        </div>
        <button onClick={this.addCell}>addCell</button>
      </div>
    );
  }
}
