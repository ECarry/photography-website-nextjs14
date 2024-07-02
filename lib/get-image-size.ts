export const getImageDimensionsFromFile = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const width = img.naturalWidth; // 使用 naturalWidth 获取图片实际宽度
        const height = img.naturalHeight; // 使用 naturalHeight 获取图片实际高度
        resolve({ width, height });
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
