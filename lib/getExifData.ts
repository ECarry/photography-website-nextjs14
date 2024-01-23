import exifr from "exifr";

export const getExifData = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();

    fr.onload = async (event) => {
      try {
        const dataURL = event.target?.result as string;
        const exifData = await exifr.parse(dataURL);
        resolve(exifData);
      } catch (error) {
        reject(error);
      }
    };

    fr.onerror = (error) => {
      reject(error);
    };

    fr.readAsDataURL(file);
  });
};
