import { nodes } from './node';
import { causes } from './cause';
import { deviations } from './deviation';

export class DataController {
    getNodes() {
        return nodes;
    }
    getDeviations() {
        return deviations;
    }
    getCauses() {
        return causes;
    }
}

// export namespace DataController {

//     interface Serializeable<T> {
//         deserialize(input: Object): T;
//         // getChildren(id: string);
//     }

//     class DataObject {
//         id: string;
//         childrenCount: number;
//         index: number;
//         parentId: string;
//         text: string; 
//     }

//     interface DataInterface {
//         getChildren(input: DataObject['id']): DataObject[];
//     }

//     class Node extends DataObject implements DataInterface {
//         getChildren(input: Deviation['parentId']) : Deviation[] {
//             var deviations = deserialize()
//         }
//     }

//     class Deviation extends DataObject implements DataInterface {
//         getChildren(input: Cause['parentId']): Cause[] {

//         }
//     }

//     class Data implements Serializeable<Data> {
//         id: string;
//         childrenCount: number;
//         index: number;
//         parentId: string;
//         text: string;
//         deserialize(input: DataObject) {
//             this.id = input.id;
//             this.childrenCount = input.childrenCount;
//             this.index = input.index;
//             this.parentId = input.parentId;
//             this.text = input.text;
//             return this;
//         }
//     }

// }