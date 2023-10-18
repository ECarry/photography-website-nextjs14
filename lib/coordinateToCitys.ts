const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

type coordinates = number []

export async function coordinateToCitys([latitude, longitude] : coordinates) {
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?&types=place&access_token=${MAPBOX_API}`

  try {
    const res = await fetch(apiUrl, {
      method: 'GET'
    })

    if (!res.ok) {
      throw new Error(`Error geocoding coordinates: ${latitude}, ${longitude}`);
    }

    const data = await res.json()

    return data.features
  } catch (error) {
    console.log(error);
    
    throw new Error(`Error geocoding coordinates: ${latitude}, ${longitude}`);
  }
}
