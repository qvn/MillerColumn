import * as React from 'react';
import { SyntheticEvent } from 'react';

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
  // isActive: boolean;
}

export function Cell(props: CellProps) {
  // TODO: unclear what synthetic event is and whetehr you need it?
    function selectCell(event: SyntheticEvent) {
      event.preventDefault();
      props.selectCell(props.cell);
    }
    function deleteCell(event: SyntheticEvent) {
      event.preventDefault();
      props.deleteCell(props.cell);
    }
    var divClassName = 'list-group-item list-group-item-action';
    // if (props.isActive) {divClassName += ' active'; }
    return (
      <div>
        <div className={divClassName}>
          <div onClick={selectCell} className="right-align">
            {props.cell.content}
          </div>
          <div>
            <a
              href="#" 
              onClick={deleteCell}
            >
              Del
            </a>
            <a 
              href="#"
              // onClick={this.viewCell}
            > 
              View 
            </a>
            <span> Edit </span>
          </div>
        </div>
      </div>
    );
  }

// TODO: create a cell_content class to fill the cell
// Binding
// https://stackoverflow.com/questions/34226076/why-is-my-onclick-being-called-on-render-react-js
