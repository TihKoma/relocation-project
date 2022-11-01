import { gql, TypedDocumentNode } from '@apollo/client'

import {
  SetListingFavorite,
  SetListingFavoriteVariables,
} from '@/modules/listing/graphql/__generated__/SetListingFavorite'

import {
  DeleteListingsSavedSearch,
  DeleteListingsSavedSearchVariables,
} from './__generated__/DeleteListingsSavedSearch'
import {
  SaveListingsSearch,
  SaveListingsSearchVariables,
} from './__generated__/SaveListingsSearch'
import { SendLead, SendLeadVariables } from './__generated__/SendLead'
import {
  UpdateSavedListingsSearchNotificationSettings,
  UpdateSavedListingsSearchNotificationSettingsVariables,
} from './__generated__/UpdateSavedListingsSearchNotificationSettings'

export const MUTATION_SUBMIT_CONTACT_FORM: TypedDocumentNode<
  SendLead,
  SendLeadVariables
> = gql`
  mutation SendLead($input: LeadInput!) {
    sendLead(input: $input) {
      status
    }
  }
`

export const MUTATION_SET_LISTING_FAVORITE: TypedDocumentNode<
  SetListingFavorite,
  SetListingFavoriteVariables
> = gql`
  mutation SetListingFavorite($id: String!, $isFavorite: Boolean!) {
    setListingFavorite(id: $id, isFavorite: $isFavorite) {
      status
    }
  }
`

export const SAVE_LISTINGS_SEARCH: TypedDocumentNode<
  SaveListingsSearch,
  SaveListingsSearchVariables
> = gql`
  mutation SaveListingsSearch($regionId: String!, $query: ListingFilterInput!) {
    saveListingsSearch(input: { regionId: $regionId, query: $query }) {
      status
    }
  }
`

export const DELETE_LISTINGS_SAVED_SEARCH: TypedDocumentNode<
  DeleteListingsSavedSearch,
  DeleteListingsSavedSearchVariables
> = gql`
  mutation DeleteListingsSavedSearch($id: String!) {
    deleteListingsSavedSearch(id: $id) {
      status
    }
  }
`

export const UPDATE_SAVED_LISTINGS_SEARCH_NOTIFICATION_SETTINGS: TypedDocumentNode<
  UpdateSavedListingsSearchNotificationSettings,
  UpdateSavedListingsSearchNotificationSettingsVariables
> = gql`
  mutation UpdateSavedListingsSearchNotificationSettings(
    $id: String!
    $settings: NotificationSettingsSavedListingsSearchInput!
  ) {
    updateSavedListingsSearchNotificationSettings(
      id: $id
      settings: $settings
    ) {
      status
    }
  }
`
