import EXIF from 'exif-js';

const getImageExifInfo = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl, { method: 'GET' });
    
    if (!response.ok) {
      throw new Error('获取图片失败');
    }

    const blob = await response.blob();

    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const exifData = EXIF.readFromBinaryFile(arrayBuffer);
      // 在这里处理解析的 EXIF 数据
      console.log('解析的 EXIF 信息：', exifData);
      return exifData
    };

    reader.readAsArrayBuffer(blob);

  } catch (error) {
    console.error('获取图片并解析 EXIF 信息出错：', error);
  }
};

export default getImageExifInfo
