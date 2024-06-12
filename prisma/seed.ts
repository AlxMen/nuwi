import { asociacionesEco } from "./data/Asociaciones_Ecologistas";
import { asociacionesVec } from "./data/Asociaciones_de_Vecinos";
import { asociacionesCaza } from "./data/Asosiaciones_de_Caza";
import { Ayuntamiento } from "./data/Ayuntamiento";
import { Cabildo } from "./data/Cabildo";
import { emergencias } from "./data/Emergencias";
import { Conserjerias } from "./data/Gobierno";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.gobierno.createMany({
      data: Conserjerias,
    });
    await prisma.cabildo.createMany({
      data: Cabildo
    });
    await prisma.ayuntamiento.createMany({
      data: Ayuntamiento,
    });
    await prisma.asociacionesEco.createMany({
      data: asociacionesEco,
    });
    await prisma.asociacionesVec.createMany({
      data: asociacionesVec
    })
    await prisma.asociacionesCaza.createMany({
      data: asociacionesCaza,
    });
    await prisma.emergencia.createMany({
      data: emergencias
    })
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
