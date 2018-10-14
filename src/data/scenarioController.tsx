import { nodes } from './scenarioNode';
import { causes } from './scenarioCause';
import { deviations } from  './scenarioDeviation';
import { ColumnObject } from '../MillerTable/Column';
import { CellObject } from '../MillerTable/Cell';

export class ScenarioData {
    id: string;
    parentId: string;
    parentTable: string;
    index: number;
    type: string;
    childrenTable: string;
    chilrenCount: number;
    text: string; 
    
    getNodes(): ScenarioData[] {
        return nodes.map((node: ScenarioData) => {return node; });
    }
    getDeviations(): ScenarioData[] {
        return deviations.map((dev: ScenarioData) => {return dev; });
    }
    getCauses(): ScenarioData[] {
        return causes.map((cause: ScenarioData) => {return cause; });
    }
}

export class Node extends ScenarioData {
    getNodes(): ScenarioData[] {
        return nodes.map((node: ScenarioData) => {return node; });
    }
}

export class Deviation extends ScenarioData {
    getDeviations(): ScenarioData[] {
        return deviations.map((dev: ScenarioData) => {return dev; });
    }
}

export class Cause {
    getCauses(): ScenarioData[] {
        return causes.map((cause: ScenarioData) => {return cause; });
    }
}

export class Controller {
    getChildrenColumnObject(childTable: string, parentId: string, parentTable?: string ): ColumnObject {
        var data = new ScenarioData;
        // var thenodes = new Node;
        var myColumn = new ColumnObject;
        switch (childTable) {
            case 'Node':
                myColumn = this.getColumnObject(parentId, 'Node', data.getNodes());
                break;
            case 'Deviation':
                myColumn = this.getColumnObject(parentId, 'Deviation', this.getChildren(parentId, data.getDeviations()));
                break;
            case 'Causes':
                console.log('get the cause!');
                myColumn = this.getColumnObject(parentId, 'Cause', this.getChildren(parentId, data.getCauses()));
                break;
            default:
                break;
        }
        return myColumn;
    }
    getChildren (parentId: string, children: ScenarioData[]): ScenarioData[] {
        var myChilren: ScenarioData[] = [];
        // if (parent.chilrenCount > 0) {
        children.forEach((child: ScenarioData) => {
            if (parentId === child.parentId) {
                myChilren.push(child);
            }
        });
        // }
        console.log(myChilren);
        return myChilren;
    }
    
    getColumnObject(id: string, title: string, data: ScenarioData[]): ColumnObject {
        return {
            id: id,
            title: title,
            cells: data.map((x: ScenarioData) => {
                var n: CellObject = {
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
}