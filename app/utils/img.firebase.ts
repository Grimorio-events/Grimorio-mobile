import { app } from "@/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

declare module "firebase/storage" {
  interface StorageReference {
    getDownloadURL(): Promise<string>;
  }
}

// Obtener la referencia al servicio de almacenamiento de Firebase
const storage = getStorage(app);

// Función para subir imagenes al Firebase Storage
const uploadImagesToFirebase = async (imageUris: string[]) => {
  try {
    const uploadedUrls = await Promise.all(
      imageUris.map(async (imageUri: string) => {
        try {
          // Crear una referencia al archivo en el almacenamiento
          const storageRef = ref(storage, "images/" + new Date().getTime());

          // Convertir la URI de la imagen a un buffer de bytes
          const response = await fetch(imageUri);
          const blob = await response.blob();

          // Subir el archivo al almacenamiento
          const snapshot = await uploadBytes(storageRef, blob);

          // Obtener la URL de descarga del archivo cargado
          const downloadURL = await getDownloadURL(snapshot.ref);

          console.log(
            "Imagen cargada con éxito. URL de descarga:",
            downloadURL
          );

          return downloadURL;
        } catch (error) {
          console.error("Error al cargar la imagen:", error);
          throw error;
        }
      })
    );

    return uploadedUrls;
  } catch (error) {
    console.error("Error al subir imágenes:", error);
    throw error;
  }
};

export default uploadImagesToFirebase;
