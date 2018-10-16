import * as React from 'react';
import { Cell, CellObject } from './Cell';
import { Button, ListGroup } from 'reactstrap';

export class ColumnObject {
  id: string; 
  title: string;
  cells: CellObject[];
}

interface ColProps {
  index: number;
  title: string;
  cells: CellObject[];
  column: ColumnObject;
  // addNewColumn: Function;
  addChildrenColumn: Function;
}

interface ColState {
  cells: CellObject[];
  activeCell?: CellObject;
  // cells: {
  //   // id: number,
  //   // content: string,
  //   cell: CellObject,
  //   isActive: boolean
  // }[];
}

// const tooltip: React.ReactNode = (
//   <Tooltip id="tooltip-top">
//     Add a new item
//   </Tooltip>
// );

export class Column extends React.Component<ColProps, ColState> {
  constructor(props: ColProps) {
    super(props);
    this.state = {
      // TODO: rethink this! The column passed in can be blank and fail. This create a bug. 
      // Cannot embbed the state to the object since it's really just content. 
      // cells: this.props.cells.map((cell: CellObject) => {return {cell: cell, isActive: false}; })
      cells: props.cells,
      activeCell: undefined
    };
    this.deleteCell = this.deleteCell.bind(this);
    this.addCell = this.addCell.bind(this);
    this.selectCell = this.selectCell.bind(this);
    this.viewCell = this.viewCell.bind(this);
  }

  addCell() {
    var newCell: CellObject = {id: '89', content: 'new Cell', parentId: '', parentTable: '', childrenTable: ''};
    this.setState({
      cells: this.state.cells.concat(newCell)
    });
  }

  deleteCell(cellIndex: number) {
    console.log(cellIndex);
    var arr = [...this.state.cells];
    arr.splice(cellIndex, 1);
    this.setState({
      cells: arr
    });
  }

  selectCell(myCell: CellObject) {
    this.setState({
        activeCell: myCell
      });
    this.props.addChildrenColumn(myCell, this.props.index);
  }

  viewCell(myCell: CellObject) {
    console.log('View cell: ', myCell.id);
  }

 render() {
    return (
      <div className="col-6">
        <div className="d-flex mb-2 mt-3">
              <ColumnTitle> {this.props.column.title} </ColumnTitle>
              <Button size="sm" color="light" className="ml-auto pt-15" onClick={this.addCell}>New</Button>
        </div>
        <ListGroup>
            {this.state.cells.map((cell, index) => (
            <Cell 
              key={cell.id} 
              cell={cell} 
              index={index}
              deleteCell={this.deleteCell} // Change to use isDeleteAble from server
              selectCell={this.selectCell} 
              isActive={(cell === this.state.activeCell) ? true : false}  
              viewCell={this.viewCell}
            />
          ))}
        </ListGroup>
      </div>
    );
  }
}

function ColumnTitle(props: {children: React.ReactNode}) {
  return (
    // ToDd: allow formatting - this require additional attributing. 
    <div className="p-15 font-weight-bold">
      {props.children}
    </div>
  );
}
