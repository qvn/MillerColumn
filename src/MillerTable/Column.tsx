import * as React from 'react';
import { Cell, CellObject } from './Cell';
import { ListGroup, Label, FormGroup, Input } from 'reactstrap';
import ModalExample from './Modal';

export class ColumnObject {
  id: string; 
  title: string;
  // TODO: check if has childrenTable. If there are no children table, there is no need to call!
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
    this.childrenCells = this.childrenCells.bind(this);
  }

  addCell() {
    var newCell: CellObject = {id: '89', content: 'new Cell', parentId: '', parentTable: '', childrenTable: '', childrenCount: 0};
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
    if (myCell.childrenTable !== undefined && myCell.childrenTable !== '') {
      this.props.addChildrenColumn(myCell, this.props.index);
    }
  }

  viewCell(myCell: CellObject) {
    console.log('View cell: ', myCell.id);
  }

  childrenCells() {
    if (this.state.cells === undefined || this.state.cells.length === 0) {
      return (<span>{'No ' + this.props.title + ' found.'}</span>);
    } else {
      return (
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
      );
    }
  }
 render() {
    return (
      <div className="col-6">
        <div className="d-flex mb-2 mt-3">
          <div className="p-15 font-weight-bold">
            {this.props.column.title}
          </div>
          <span className="ml-auto pt-15">
            <ModalExample buttonLabel="New" buttonColor="light" buttonSize="sm" modalTitle={this.props.title}>
              <FormGroup>
                <Label for="exampleText">{this.props.title + ' Name'}</Label>
                <Input type="text" name="name" id={this.props.column.id + 'Name'} />
              </FormGroup>
            </ModalExample>
          </span>
        </div>
          {this.childrenCells()}
     </div>
    );
  }
}
