import { Autos, AutosCollection } from "./models";
import { AutosControllers } from "./controllers";
import minimist from "minimist";

const rawargs = minimist(process.argv.slice(2));

interface AutosArgs {
  all?: boolean;
  marca?: string;
  year?: number;
  modelo?: string;
  color?: string;
  count?: boolean;
  add?: boolean;
  newMarca?: string;
  newModelo?: string;
  newYear?: number;
  newColor?: string;
  sortModelo?: boolean; // ordenar por modelo
  sortAnio?: boolean; // ordenar por año
}

const args: AutosArgs = {
  all: rawargs.all,
  marca: rawargs.marca,
  year: rawargs.year ? Number(rawargs.year) : undefined,
  modelo: rawargs.modelo,
  color: rawargs.color,
  count: rawargs.count,
  add: rawargs.add,
  newMarca: rawargs.newMarca,
  newModelo: rawargs.newModelo,
  newYear: rawargs.newYear ? Number(rawargs.newYear) : undefined,
  newColor: rawargs.newColor,
  sortModelo: rawargs.sortModelo,
  sortAnio: rawargs.sortAnio,
};

const collection = new AutosCollection();
const controller = new AutosControllers(collection);

(async () => {
  await collection.getAll();

  // Mostrar todos los autos
  if (args.all) {
    const autos = await controller.getAll();
    console.log("Todos los autos:");
    console.table(autos);
  }

  // Contar autos
  if (args.count) {
    const total = await controller.countCar();
    console.log("Total de autos:", total);
  }

  // Filtrar por marca
  if (args.marca) {
    const autos = await controller.getByMarca(args.marca);
    console.log(`Autos de la marca ${args.marca}:`, autos);
  }

  // Filtrar por año
  if (args.year) {
    const autos = await controller.getByYear(args.year);
    console.log(`Autos del año ${args.year}:`);
    console.table(autos);
  }

  // Ordenar por modelo
  if (args.sortModelo) {
    const autos = await controller.ordenModelo();
    console.log("Autos ordenados por modelo:");
    console.table(autos);
  }

  // Ordenar por año
  if (args.sortAnio) {
    const autos = await controller.ordenAño();
    console.log("Autos ordenados por año:");
    console.table(autos);
  }

  // Agregar un nuevo auto
  if (
    args.add &&
    args.newMarca &&
    args.newModelo &&
    args.newYear &&
    args.newColor
  ) {
    const newAuto = new Autos(
      args.newMarca,
      args.newModelo,
      args.newYear,
      args.newColor
    );
    const autos = await controller.addCar(newAuto);
    console.log("Auto agregado. Lista actualizada:");
    console.table(autos);
  }
})();
