// https://stackoverflow.com/questions/22885995/how-do-i-initialize-a-typescript-object-with-a-json-object

export namespace plants_model {
  export interface ISerializable<T> {
    deserialize(input: Object): T;
  }

  export class Unit implements ISerializable<Unit> {
    unit_id: number;
    name: string;
    deserialize(input: any) {
      this.unit_id = input.id;
      this.name = input.name;
      return this;
    }
  }

  export class Plant implements ISerializable<Plant> {
    plant_id: number;
    name: string;
    // units: Unit[];

    deserialize(input) {
      this.plant_id = input.id;
      this.name = input.name;
      this.units = input.units.map(unit => new Unit().deserialize(unit));
      return this;
    }
  }

  export class Data implements ISerializable<Data> {
    plants: Plant[];
    deserialize(input) {
      this.plants = input.map(plant => new Plant().deserialize(plant));
      return this;
    }
  }
}
