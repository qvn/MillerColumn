// https://stackoverflow.com/questions/22885995/how-do-i-initialize-a-typescript-object-with-a-json-object

export namespace plants_model {
  
  class PlantData {
    id: number;
    index: number;
    guid: string;
    name: string;
    phone: string;
    address: string;
    about: string;
    latitude: string;
    longitude: string;
    units: UnitData[];
  }

  class UnitData {
    id: number;
    name: string;
  }

  export interface Serializable<T> {
    deserialize(input: Object): T;
  }

  export class Unit implements Serializable<Unit> {
    id: number;
    name: string;
    deserialize(input: UnitData) {
      this.id = input.id;
      this.name = input.name;
      return this;
    }
  }

  export class Plant implements Serializable<Plant> {
    id: number;
    name: string;
    units: Unit[];

    deserialize(input: PlantData) {
      this.id = input.id;
      this.name = input.name;
      this.units = input.units.map((unit: UnitData) =>
        new Unit().deserialize(unit)
      );
      return this;
    }
  }

  export class Data implements Serializable<Data> {
    plants: Plant[];
    deserialize(input: PlantData[]) {
      this.plants = input.map((plant: PlantData) => new Plant().deserialize(plant));
      return this;
    }

    getUnitForPlant(plantId: number): Unit[] {
      var myPlant = this.plants.find((plant: Plant) => plant.id === plantId);
      // TODO throw exception instead
      if (myPlant == null) {
        console.log('getUnitForPlant found no plant id' + plantId);
        return [];
      } else {
        return myPlant.units;
      }
    }
  }
}