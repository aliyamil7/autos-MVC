import _ from "lodash";
import { readFile, writeFile } from "fs/promises";

class Autos {
  marca: string;
  modelo: string;
  año: number;
  color: string;

  constructor(marca: string, modelo: string, año: number, color: string) {
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
    this.color = color;
  }
}

class AutosCollection {
  autos: Autos[] = [];

  async getAll(): Promise<Autos[]> {
    try {
      const datos = await readFile("autos.json", "utf-8");
      this.autos = JSON.parse(datos);

      return this.autos;
    } catch (err) {
      console.log(`Error al cargar el archivo`, err);
      return [];
    }
  }

  async getByMarca(marca: string): Promise<Autos[]> {
    const todos = await this.getAll();

    return _.filter(
      todos,
      (a) => a.marca.toLowerCase() === marca.toLowerCase()
    );
  }

  async getByYear(year: number): Promise<Autos[]> {
    const todos = await this.getAll();

    return _.filter(todos, (a) => a.año === year);
  }

  async ordenModelo(): Promise<Autos[]> {
    const todos = await this.getAll();

    return _.sortBy(todos, "modelo");
  }

  async ordenAño(): Promise<Autos[]> {
    const todos = await this.getAll();

    return _.sortBy(todos, "año");
  }

  async countCars(): Promise<number> {
    const todos = await this.getAll();

    return _.size(todos);
  }

  async addCar(auto: Autos) {
    const datos = await readFile("autos.json", "utf-8");

    const autos: Autos[] = JSON.parse(datos);

    autos.push(auto);

    await writeFile("autos.json", JSON.stringify(autos, null, 2), "utf-8");

    return autos;
  }
}

export { Autos, AutosCollection };
