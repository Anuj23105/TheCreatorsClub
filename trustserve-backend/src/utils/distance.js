function toRadians(value) {
  return (value * Math.PI) / 180
}

function distanceKmBetween(pointA, pointB) {
  const [lng1, lat1] = pointA
  const [lng2, lat2] = pointB

  const earthRadiusKm = 6371
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Number((earthRadiusKm * c).toFixed(1))
}

module.exports = { distanceKmBetween }
