// 定义一个函数，用于获取图片的大小和比例
export const getImageSize = (file: File): Promise<{ width: number; height: number; ratio: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        // 计算图片的比例，保留两位小数
        const ratio = Number((img.width / img.height).toFixed(2));

        // 返回图片的宽度、高度和比例
        resolve({ width: img.width, height: img.height, ratio: ratio });
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
