import { nodes } from './scenarioNode';
import { causes } from './scenarioCause';
import { deviations } from  './scenarioDeviation';
import { ColumnObject } from '../MillerTable/Column';
import { CellObject } from '../MillerTable/Cell';
export namespace ScenarioData {
    export class Node {
        id: string;
        type: string;
        chilrenCount: number;
        index: number;
        parentId: string;
        text: string;   
        getNodes(): ColumnObject {
            return {
                title: 'Node',
                cells: nodes.map((x: Node) => {
                    var n: CellObject = {
                        id: x.index,
                        content: x.text
                    };
                    return n;
                })
            };
        }
    }

    export class Deviation {
        id: string;
        parentId: string;
        chilrenCount: number;
        index: number;
        text: string;

        getDeviations(): ColumnObject {
            return {
                title: 'Deviation',
                cells: deviations.map((x: Deviation) => {
                    var myDeviation: CellObject = {
                        id: x.index,
                        content: x.text
                    };
                    return myDeviation;
                })
            };
        }
    }

    export class Cause {
        id: string;
        chilrenCount: number;
        index: number;
        parentId: string;
        text: string;  
        
        getCause(): ColumnObject {
            return {
                title: 'Cause',
                cells: causes.map((x: Cause) => {
                    var c: CellObject = {
                        id: x.index,
                        content: x.text
                    };
                    return c;
                })
            };
        }
    }
}
