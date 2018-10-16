import * as React from 'react';
import { ListGroupItem, Badge } from 'reactstrap';

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
  // childrenCount: number;
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
    return (
      <ListGroupItem action={true} onClick={this.selectCell} active={this.props.isActive} className="d-flex justify-content-between">
          <span>
            {this.props.cell.content.substring(0, 30)}
          </span>
          <span>
            <Badge >5</Badge>
          </span>
      </ListGroupItem>
    );
  }
}

// Binding
// https://stackoverflow.com/questions/34226076/why-is-my-onclick-being-called-on-render-react-js
