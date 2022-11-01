export const formatNeighborhoodFullName = (name: string, subtitle: string) => {
  if (!subtitle) {
    return name
  }
  return `${name} in ${subtitle}`
}
