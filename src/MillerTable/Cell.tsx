import * as React from 'react';

export class CellObject {
  id: number;
  content: string; // content can be an object
}

export interface CellProps {
  cell: CellObject;
  // TODO: handle item below. Does Database give this information?
  // isDeleteAble
  // isEditable
  deleteCell: Function;
}
interface CellState {
  cell: CellObject; // cell content can be changed upon update
  isActive: boolean;
}
// TODO: create a cell_content class to fill the cell
export class Cell extends React.Component<CellProps, CellState> {
  constructor(props: CellProps) {
    super(props);
    this.selectCell = this.props.deleteCell.bind(this);
    this.state = {
      cell: this.props.cell,
      isActive: false
    };
  }
  // TODO: deactive all other cells
  selectCell() {
    this.setState({
      isActive: this.state.isActive ? false : true
    });
  }

  // TODO: editor handler must promp for other things. For now, we just get content
  // this is a complicated feature to allow inline editting.
  // updatecellContent(cell: CellObject, content: string) {}

  render() {
    let divClassName = 'list-group-item list-group-item-action ';
    if (this.state.isActive) {divClassName += ' active'; }
    return (
      <div>
        <div className={divClassName}>
          <div onClick={this.selectCell} className="right-align">
            {this.state.cell.content}
          </div>
          <div>
            <a
              href="#"
            >
              Del
            </a>
            <span> View </span>
            <span> Edit </span>
          </div>
        </div>
      </div>
    );
  }
}

// Binding
// https://stackoverflow.com/questions/34226076/why-is-my-onclick-being-called-on-render-react-js
