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
  deleteCell: Function;
  selectCell: Function;
  viewCell: Function;
  isActive: boolean;
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
    this.props.deleteCell(this.props.cell);
  }

  viewCell() {
    this.props.viewCell(this.props.cell);
  }

  // TODO: editor handler must promp for other things. For now, we just get content
  // this is a complicated feature to allow inline editting.
  // updatecellContent(cell: CellObject, content: string) {}

  render() {
    let divClassName = 'list-group-item list-group-item-action w-25';
    if (this.props.isActive) {divClassName += ' active'; }
    return (
      <div>
        <div className={divClassName}>
          <div onClick={this.selectCell} className="right-align">
            {this.props.cell.content}
          </div>
          <div>
            <a
              href="#" 
              onClick={this.deleteCell}
            >
              Del
            </a>
            <a 
              href="#"
              onClick={this.viewCell}
            > 
              View 
            </a>
            <span> Edit </span>
          </div>
        </div>
      </div>
    );
  }
}

// Binding
// https://stackoverflow.com/questions/34226076/why-is-my-onclick-being-called-on-render-react-js
