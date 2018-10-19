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

export namespace ScenarioAPI {
    export interface Serializable<T> {
        deserialize(input: Object): T;
    }

    // class NodeData {
    //     id: string;
    //     parentId: string;
    //     parentTable: string;
    //     index: number;
    //     type: string;
    //     childrenTable: string;
    //     chilrenCount: number;
    //     text: string; 
    // }

    export class Scenario implements Serializable<Scenario> {
        id: string = '';
        parentId: string = '';
        parentTable: string = '';
        index: number = 0;
        type: string = '';
        // hasChildren: boolean;
        childrenTable: string = '';
        chilrenCount: number = 0;
        text: string = ''; 

        // constructor(input?: Scenario) {
        //     if (input) {
        //         this.deserialize(input);
        //     }
        // }

        deserialize(input: Scenario) {
            // Note: keys must be intialize with values to be found in the Object.keys, instantiation isn't enough
            const keys = Object.keys(this);
            for (const key of keys) {
                if (input.hasOwnProperty(key)) {
                    this[key] = input[key];
                }
            }
            return this;
        } 
    }

    export class Node extends Scenario {

    }

    export class Deviation extends Scenario {
        // TODO: Deviation class has more attributes than the Base class
    }

    export class Cause extends Scenario {

    }
    
    export class Data implements Serializable<Data> {
        scenarios: Scenario[];
        deserialize (input: Scenario[]) {
            this.scenarios = input.map((scenario) => new Scenario().deserialize(scenario));
            return this;
        }

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