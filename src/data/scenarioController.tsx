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
    getChildren (parent: ScenarioData, children: ScenarioData[]): ScenarioData[] {
        var myChilren: ScenarioData[] = [];
        children.forEach((child: ScenarioData) => {
            if (parent.id === child.parentId) {
                myChilren.push(child);
            }
        });
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