import { writeFile, readFile, unlink, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Incident } from "../interfaces/interface.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Apuntamos a la raíz del proyecto (donde corre Node) para que no dependa de si es /src o /dist
const DATA_DIR = path.join(process.cwd(), "data");
const DATAPATH = path.join(DATA_DIR, "data.json");

export const UPLOADSPATH = path.join(process.cwd(), "public", "uploads");

export const readData = async (): Promise<Incident[]> => {
  try {
    // Si la carpeta o el archivo no existen, los creamos iniciales
    if (!existsSync(DATAPATH)) {
      await writeData([]);
      return [];
    }

    const data = await readFile(DATAPATH, "utf8");
    if (!data.trim()) return [];

    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer data.json:", error);
    // Si falla por cualquier razón, retornamos un arreglo vacío en lugar de romper el servidor
    return [];
  }
};

export const writeData = async (newincidents: Incident[]) => {
  // Aseguramos que las carpetas /data y /public/uploads existan en el servidor de Render
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  
  await writeFile(DATAPATH, JSON.stringify(newincidents, null, 2), "utf8");
  console.log("data write success");
};

export const deleteFile = async (filename: string) => {
  try {
    const filepath = path.join(UPLOADSPATH, filename);
    if (existsSync(filepath)) {
      await unlink(filepath);
      console.log("file deleted:", filename);
    }
  } catch (error) {
    console.error("Error eliminando archivo:", error);
  }
};