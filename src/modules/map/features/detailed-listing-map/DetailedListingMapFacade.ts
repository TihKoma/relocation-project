import { GetDetailedListing_getDetailedListing as Listing } from '@/modules/listing/graphql/__generated__/GetDetailedListing'
import { Coordinates, OnMarkersDrawnCallback } from '@/modules/map'
import {
  MapDrawer,
  MapEvents,
  MapFacade,
  MapPosition,
  MapServerApi,
} from '@/modules/map/base'
import {
  CanDrawPropertyMarker,
  PropertyMarkerMapBlock,
} from '@/modules/map/blocks/property-marker'

import {
  ListingBathrooms,
  ListingBedrooms,
  ListingTransactionType,
} from '../../../../../__generated__/globalTypes'

export class DetailedListingMapFacade
  extends MapFacade
  implements CanDrawPropertyMarker
{
  private _propertyMarkerBlock: PropertyMarkerMapBlock
  private _currentListing: Listing | null = null

  constructor(
    mapDrawer: MapDrawer,
    mapEvents: MapEvents,
    mapServerApi: MapServerApi,
    mapPosition: MapPosition,
    propertyMarkerBlock: PropertyMarkerMapBlock,
  ) {
    super(mapDrawer, mapEvents, mapServerApi, mapPosition)
    this._propertyMarkerBlock = propertyMarkerBlock
  }

  setCurrentListing(listing: Listing) {
    this._currentListing = listing
  }

  async drawMarkers() {
    const { bbox } = this._mapPosition.getPosition()
    const posts = await this._mapServerApi.getPostMarkersBBox(bbox)

    const markers = await this._mapServerApi.getListingsMarkersBBox({
      bbox,
      filter: {
        transactionType:
          this._currentListing?.listingInfo.transactionType ||
          ListingTransactionType.FOR_SALE,
        bedrooms: ListingBedrooms.ROOMS_ANY,
        bathrooms: ListingBathrooms.ROOMS_ANY,
      },
    })

    if (this._currentListing) {
      markers.realEstate = markers.realEstate.filter(
        (listing) => listing.id !== this._currentListing?.id,
      )
    }

    return this._mapDrawer.drawMarkers(
      {
        post: posts,
        realEstate: markers.realEstate,
        listingsGroup: markers.listingsGroup,
      },
      { withClustering: true },
      this.drawMarkersCallback,
    )
  }

  drawPropertyMarker(coords: Coordinates) {
    this._propertyMarkerBlock.drawPropertyMarker(coords)
    this.drawMarkers()
    this._mapPosition.flyTo(coords, 16)
  }

  onPropertyMarkerDrawn(callback: OnMarkersDrawnCallback) {
    return this._propertyMarkerBlock.onMarkersDrawn(callback)
  }
}
