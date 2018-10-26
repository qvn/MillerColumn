import * as React from 'react';
import { Column, ColumnObject } from './Column';
import { CellObject } from './Cell';

var dbURL = 'http://localhost:3001/';
// avoid using hard coding the first column name
var firstColumnName = 'Node';

interface ScenarioDataType {
  childrenCount: number;
  id: string;
  text: string;
  parentId: string;
  parentTable: string;
  childrenTable: string;
}
function getColumnObject(id: string, title: string, data: ScenarioDataType[]): ColumnObject {
    return {
        id: id,
        title: title,
        cells: data.map((x: ScenarioDataType) => {
            var n: CellObject = {
                childrenCount: x.childrenCount,
                id: x.id,
                content: x.text,
                parentId: x.parentId,
                parentTable: x.parentTable,
                childrenTable: x.childrenTable
            };
            return n;
        })
    };
}

interface ContainerProps {
  }
interface ContainerStates {
    columns: ColumnObject[];
  }

export class Container extends React.Component<
    ContainerProps,
    ContainerStates
  > {
    constructor(props: ContainerProps) {
      super(props);
      this.state = {
        columns: [],
      };
      // this.addNewColumn = this.addNewColumn.bind(this);
      this.addChilrenColumn = this.addChilrenColumn.bind(this);
      this.deleteColumn = this.deleteColumn.bind(this);
    }

    componentDidMount() {
        let self = this;
        let url =  dbURL + firstColumnName;
        fetch(url, {method: 'GET'}).then(function(response: Response) {
          if (response.status >= 400) {
            throw new Error('Bad Response from Server');
          }
          return response.json();
        }).then(function(data: ScenarioDataType[]) {
          // Avoid using hardcoding the first column numbner
          var newColumn: ColumnObject = getColumnObject('0', firstColumnName, data);
          self.setState((prevState: ContainerStates) => {
            return {
              columns: [...prevState.columns].concat(newColumn)
            };
          });
        });
      }
 
    deleteColumn() {
      var newColumns: ColumnObject[] = [...this.state.columns];
      newColumns = newColumns.slice(0, this.state.columns.length - 1);
      this.setState(
        {columns: newColumns}
      );
    }
    // TODO: Passing column index seems clunky
    // should column oiwn this call once it mounts?
    addChilrenColumn(cell: CellObject, columnIndex: number) {
        let self = this;
        let url = dbURL + cell.childrenTable + '?parentId=' + cell.id;
        console.log(url);
        fetch(url, {method: 'GET'}).then(function(response: Response) {
          if (response.status >= 400) {
            throw new Error('Bad Response from Server');
          }
          return response.json();
        }).then(function(data: ScenarioDataType[]) {
          var newColumn: ColumnObject = getColumnObject(cell.parentId, cell.childrenTable, data);
          self.setState((prevState: ContainerStates) => {
            var arr = [... prevState.columns].slice(0, columnIndex + 1).concat(newColumn);
            return {
              columns: arr
            };
          });
        });
    }

    // note: key must use the ID so that component understands it will refresh upon a new key (sever returns a new Id, whcih trigger the refresh of 
    // compoeent). This is a potential bug where the ID returned is identical to previous Id. However, this is not expected each ID should be the ID
    // of the parent from selected element, which would be different for all element.
    render() {
      return (
        <div className="container" id="container">
          {/* <button onClick={this.addNewColumn}>add col</button> */}
          <div className="row d-flex max-height-100">
            {this.state.columns.map((column: ColumnObject, index: number) => 
              <Column 
                key={index} 
                index={index}
                column={column} 
                cells={column.cells}
                title={column.title}
                // addNewColumn={this.addNewColumn} 
                addChildrenColumn={this.addChilrenColumn}
              />)
            }
          </div>
        </div>
      );
    }
  }
