interface GPSCoordinate {
  ref: "N" | "S" | "E" | "W";
  values: [number, number, number];
}

export default function parseGPSCoordinate(coordinate: GPSCoordinate): number | null {
  const { ref, values } = coordinate;

  const [degrees, minutes, seconds] = values;
  
  // 将度、分、秒转换为度数
  const decimalDegrees = degrees + minutes / 60 + seconds / 3600;

  // 根据坐标参考来确定正负号
  if (ref === "S" || ref === "W") {
    return -decimalDegrees;
  }

  return decimalDegrees;
}
