import * as React from 'react';

export class CellObject {
  id: string;
  content: string; // content can be an object
  parentTable: string;
  parentId: string;
  childrenTable: string;
}

export interface CellProps {
  cell: CellObject;
  index: number;
  deleteCell: Function;
  selectCell: Function;
  viewCell: Function;
  isActive: boolean;
  // isDeletable: boolean;
  // isEditable: boolean;
}
interface CellState {
  // cell: CellObject; // cell content can be changed upon update
}
// TODO: create a cell_content class to fill the cell
export class Cell extends React.Component<CellProps, CellState> {
  constructor(props: CellProps) {
    super(props);
    this.deleteCell = this.deleteCell.bind(this);
    this.selectCell = this.selectCell.bind(this);
    this.viewCell = this.viewCell.bind(this);
  }

  selectCell() {
    this.props.selectCell(this.props.cell);
  }

  deleteCell() {
    this.props.deleteCell(this.props.index);
  }

  viewCell() {
    this.props.viewCell(this.props.cell);
  }

  // TODO: editor handler must promp for other things. For now, we just get content
  // this is a complicated feature to allow inline editting.
  // updatecellContent(cell: CellObject, content: string) {}

  render() {
    let divClassName = 'list-group-item list-group-item-action flex-column align-items-start';
    if (this.props.isActive) {divClassName += ' list-group-item-primary'; }
    return (
        <div onClick={this.selectCell} className={divClassName}>
          <div>
            {/* TODO: this should be turn into another component for composition */}
            {/* <div className="d-flex justify-content-between">
              <h6 className="font-weight-bold">Node 1: Loop Reactor and Dump Tank</h6>
            </div> */}
              <small>
                {/* <span className="font-weight-bold">Design Intent: </span> */}
                {this.props.cell.content.substring(0, 30)}
              </small>
          </div>
        </div>
    );
  }
}

// Binding
// https://stackoverflow.com/questions/34226076/why-is-my-onclick-being-called-on-render-react-js
