export function convertToCoordination(
  longitude?: number | null,
  latitude?: number | null
): string {
  if (!longitude || !latitude) return "- -";

  const eastWest = longitude >= 0 ? "E" : "W";
  const northSouth = latitude >= 0 ? "N" : "S";

  const eastWestCoord = `${Math.abs(longitude).toFixed(4)} ${eastWest}`;
  const northSouthCoord = `${Math.abs(latitude).toFixed(4)} ${northSouth}`;

  return `${eastWestCoord}, ${northSouthCoord}`;
}
