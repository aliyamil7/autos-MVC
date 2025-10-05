import { Autos, AutosCollection } from "./models";

class AutosControllers {
  autos: AutosCollection;

  constructor(autos: AutosCollection) {
    this.autos = autos;
  }

  async getAll() {
    return await this.autos.getAll();
  }

  async getByMarca(marca: string) {
    return await this.autos.getByMarca(marca);
  }

  async getByYear(year: number) {
    return await this.autos.getByYear(year);
  }

  async ordenModelo() {
    return await this.autos.ordenModelo();
  }

  async ordenAño() {
    return await this.autos.ordenAño();
  }

  async countCar() {
    return this.autos.countCars();
  }

  async addCar(auto: Autos) {
    return await this.autos.addCar(auto);
  }
}

export { AutosControllers };
