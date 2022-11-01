//TODO delete this when backend add images to api/auth/internal/country-codes https://nicity.atlassian.net/browse/CP-1646
const importAll = (contexts: any) => {
  const images = {} as {
    [key: string]: any
  }
  contexts.keys().forEach((item: any) => {
    const image = contexts(item)
    if (typeof image === 'string') {
      images[item.replace('./', '')] = image
    } else {
      images[item.replace('./', '')] = image.default.src
    }
  })
  return images
}
export const flags = importAll(
  require.context('svg-country-flags/png100px', false, /\.png$/),
)
