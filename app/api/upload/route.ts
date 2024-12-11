import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  /**
   * constante que el cual espera la entrada de datos desde el formulario que introduce los documentos en el aplicativo
   */
  const data = await request.formData();
  /**
   * constante que separa el fichero mandado en el formulario para guardarlo en el servidor o ruta expecificada
   */
  const file: File | null = data.get("file") as unknown as File;
  /**
   * comprobacion de si el archivo se adjunto correctamente en el formulario y se la constante que lo separa lo pudo recoger
   */
  if (!file) {
    return NextResponse.json(
      { success: false, message: "No file uploaded" },
      { status: 400 }
    );
  }
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Asegúrate de que este directorio exista y tenga los permisos correctos
  /**
   * variables para crear la ruta destino si no existiese donde se guardara el documento con el nombre que se puso en el formulario 
   */
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const filePath = path.join(uploadDir, file.name);
  /**
   * subida de documento al directorio destino y guardado de datos en la base de datos y comprobacion de si la subida se realizo correctamente
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
