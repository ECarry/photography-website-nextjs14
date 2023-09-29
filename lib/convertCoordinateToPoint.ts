function formatDegrees(num: number): string {
  const d = Math.floor(num);
  const m = Math.floor((num - d) * 60);
  const s = Math.round((((num - d) * 60) - m) * 60);

  return `${d}°${m}'${s}"`;
}

export default function convertCoordinates(lat: number, lon: number): string {
  if (lat === null || lat === undefined || lon === null || lon === undefined) {
    return "";
  }

  const latDirection = lat >= 0 ? "N" : "S";
  const lonDirection = lon >= 0 ? "E" : "W";
  const latDegrees = formatDegrees(Math.abs(lat));
  const lonDegrees = formatDegrees(Math.abs(lon));

  return `${latDegrees}${latDirection} ${lonDegrees}${lonDirection}`;
}
