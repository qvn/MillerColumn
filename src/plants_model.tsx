// https://stackoverflow.com/questions/22885995/how-do-i-initialize-a-typescript-object-with-a-json-object

export namespace plants_model {
  export interface Serializable<T> {
    deserialize(input: Object): T;
  }

  export class Unit implements Serializable<Unit> {
    id: number;
    name: string;
    deserialize(input: Unit) {
      this.id = input.id;
      this.name = input.name;
      return this;
    }
  }

  export class Plant implements Serializable<Plant> {
    id: number;
    name: string;
    units: Unit[];

    deserialize(input: Plant) {
      this.id = input.id;
      this.name = input.name;
      this.units = input.units.map(unit => new Unit().deserialize(unit));
      return this;
    }
  }

  export class Data implements Serializable<Data> {
    plants: Plant[];
    deserialize(input: Plant[]) {
      this.plants = input.map(plant => new Plant().deserialize(plant));
      return this;
    }
  }
}
