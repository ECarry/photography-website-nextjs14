/**
 * Converts an image file to a Buffer.
 * @param file - The image file to be converted.
 * @returns A Promise that resolves to a Buffer containing the file data.
 */
export const imageToBuffer = (image: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const buffer = Buffer.from(arrayBuffer);

      resolve(buffer);
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(image);
  });
};
