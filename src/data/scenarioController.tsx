import { nodes } from './scenarioNode';
import { causes } from './scenarioCause';
import { deviations } from  './scenarioDeviation';
import { ColumnObject } from '../MillerTable/Column';
import { CellObject } from '../MillerTable/Cell';

class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c: string) {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString(16);
        });
    }
}

export class ScenarioData {
    id: string;
    parentId: string;
    parentTable: string;
    index: number;
    type: string;
    childrenTable: string;
    chilrenCount: number;
    text: string; 
    
    getNodes(): ColumnObject {
        var randomGuid = Guid.newGuid();
        return this.getColumnObject(randomGuid, 'Node', nodes.map((node: ScenarioData) => {return node; }));
    }
    getDeviations(nodeId: string): ColumnObject {
        return this.getColumnObject(nodeId, 'Deviation', (deviations.map((dev: ScenarioData) => {return dev; }).filter((dev: ScenarioData) => (dev.parentId === nodeId))));
    }
    getCauses(devId: string): ColumnObject {
        return this.getColumnObject(devId, 'Cause', causes.map((cause: ScenarioData) => {return cause; }).filter((cause: ScenarioData) => (cause.parentId === devId)));
    } 
    
    getChildren(parentId: string, childrenTable: string): ColumnObject | null {
        switch (childrenTable) {
            // case 'Node': return this.getNodes(); 
            case 'Deviation': return this.getDeviations(parentId); 
            case 'Causes': return this.getCauses(parentId); 
            default: return null; 
        }
    }

    getColumnObject(id: string, title: string, data: ScenarioData[]): ColumnObject {
        return {
            id: id,
            title: title,
            cells: data.map((x: ScenarioData) => {
                var n: CellObject = {
                    childrenCount: x.chilrenCount,
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