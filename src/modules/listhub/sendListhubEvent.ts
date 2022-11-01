import { ListhubEvent } from './types'

export const sendListhubEvent = (
  eventName: ListhubEvent,
  listingKey: string | string[],
) => {
  try {
    if (Array.isArray(listingKey)) {
      const mappedKeys = listingKey.map((key) => ({ lkey: key }))
      // @ts-ignore
      lh('submit', eventName, mappedKeys)
    }
    // @ts-ignore
    lh('submit', eventName, { lkey: listingKey })
  } catch {}
}
