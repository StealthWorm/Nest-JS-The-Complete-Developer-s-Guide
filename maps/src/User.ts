import { faker } from "@faker-js/faker";
import { Mappable } from "./CustomMap";

// ao dizer que User implementa Mappable garantimos que o Typescript nos direcionará para a classe correta quando ocorrer mudanças na interface
export class User implements Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return `User name is ${this.name}`
  }
}
