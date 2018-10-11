import { nodes } from './scenarioNode';
import { causes } from './scenarioCause';
import { deviations } from  './scenarioDeviation';
import { ColumnObject } from '../MillerTable/Column';
import { CellObject } from '../MillerTable/Cell';

export class ScenarioData {
    id: string;
    parentId: string;
    index: number;
    type: string;
    chilrenCount: number;
    text: string; 
    getChildren (parentId: string, children: ScenarioData[]): ScenarioData[] {
        var myChilren: ScenarioData[] = [];
        // if (parent.chilrenCount > 0) {
        children.forEach((child: ScenarioData) => {
            if (parentId === child.parentId) {
                myChilren.push(child);
            }
        });
        // }
        return myChilren;
    }
    getColumnObject(title: string, data: ScenarioData[]): ColumnObject {
        return {
            title: title,
            cells: data.map((x: ScenarioData) => {
                var n: CellObject = {
                    id: x.index,
                    content: x.text
                };
                return n;
            })
        };
    }
    getNodes(): ScenarioData[] {
        return nodes.map((node: ScenarioData) => {return node; });
    }
    getDeviations(): ScenarioData[] {
        return deviations.map((dev: ScenarioData) => {return dev; });
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
    childTable: string;
    parentTable: string;
    parentId: string;
    
    getChidren(childTable: string, parentId: string, parentTable?: string ): ColumnObject {
        var data = new ScenarioData;
        // var thenodes = new Node;
        var myColumn = new ColumnObject;
        switch (childTable) {
            case 'Node':
                myColumn = data.getColumnObject('Node', data.getNodes());
                // myColumn = thenodes.getColumnObject('Node', thenodes.getNodes());
                break;
            case 'Deviation':
                myColumn = data.getColumnObject('Deviation', data.getChildren(parentId, data.getDeviations()));
                break;
            default:
                break;
        }
        return myColumn;
    }
}