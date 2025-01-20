import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

/**
 * Maneja la solicitud POST para subir un archivo.
 * 
 * @async
 * @function POST
 * @param {NextRequest} request - Solicitud HTTP.
 * @returns {Promise<NextResponse>} Respuesta HTTP.
 */
export async function POST(request: NextRequest) {
  /**
   * Obtiene los datos del formulario de la solicitud.
   *
   * @type {FormData} data - Datos del formulario.
   */
  const data = await request.formData();
  /**
   * Obtiene el archivo subido.
   *
   * @type {File}
   */
  const file: File | null = data.get("file") as unknown as File;
  
  if (!file) {
    return NextResponse.json(
      { success: false, message: "No file uploaded" },
      { status: 400 }
    );
  }
 /**
  * Convierte el archivo a un búfer.
  */
  const bytes = await file.arrayBuffer();
  /**
   * Crea un búfer a partir de los bytes del archivo.
   */
  const buffer = Buffer.from(bytes);
  /**
   * Directorio de subida de archivos.
   */
  const uploadDir = path.join(process.cwd(), "public/uploads");
  /**
   * Ruta del archivo.
   */
  const filePath = path.join(uploadDir, file.name);
  /**
   * Escribe el archivo en el sistema de archivos.
   */
  try {
    await writeFile(filePath, buffer);
    console.log("File saved to", filePath);
    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { success: false, message: "Error saving file" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
