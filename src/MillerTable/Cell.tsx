import * as React from 'react';
import { ListGroupItem, Badge } from 'reactstrap';
import { CellActionButtonGroup } from './CellActionButtonGroup';

export class CellObject {
  id: string;
  content: string; // content can be an object
  parentTable: string;
  parentId: string;
  childrenTable: string;
  childrenCount: number;
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
  hideActionBtnGroup: boolean;
}
// TODO: create a cell_content class to fill the cell
export class Cell extends React.Component<CellProps, CellState> {
  constructor(props: CellProps) {
    super(props);
    this.state = {
      hideActionBtnGroup: true 
    };
    this.deleteCell = this.deleteCell.bind(this);
    this.selectCell = this.selectCell.bind(this);
    this.viewCell = this.viewCell.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
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

  handleMouseOver() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(prevState: CellState) {
    return {
      hideActionBtnGroup: !prevState.hideActionBtnGroup
    };
  }

  // TODO: editor handler must promp for other things. For now, we just get content
  // this is a complicated feature to allow inline editting.
  // updatecellContent(cell: CellObject, content: string) {}

  render() {
    return (
      <ListGroupItem action={true} onClick={this.selectCell} active={this.props.isActive} className="d-flex justify-content-between" onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOver}>
        <span>
          {this.props.cell.content.substring(0, 30)}
        </span>
        <div>
          <CellActionButtonGroup hideAll={this.state.hideActionBtnGroup} hasView={true} hasDelete={true} hasCopy={true} hasEdit={true} size="sm" color="light"/>
          {/* This needs to be a "has children" the cell properties is very presumptous here */}
          {(this.props.cell.childrenTable !== undefined) && <Badge>{this.props.cell.childrenCount}</Badge>}
        </div>
      </ListGroupItem>
    );
  }
}
// Binding
// https://stackoverflow.com/questions/34226076/why-is-my-onclick-being-called-on-render-react-js
