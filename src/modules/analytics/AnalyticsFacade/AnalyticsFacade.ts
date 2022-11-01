import * as amplitude from '@amplitude/analytics-browser'

import type {
  ContentType,
  SharingMethod,
} from '@/components/shared/ShareDropdown/types'
import { Quiz } from '@/modules/quiz'
import { ReactionType } from '@/modules/reaction'
import {
  RelocationMarketplaceServiceGroupName,
  RelocationMarketplaceServiceName,
} from '@/modules/relocation-marketplace'
import { WITH_ANALYTICS } from '@/modules/utils/config'
import { isServer } from '@/modules/utils/is-server'

if (WITH_ANALYTICS) {
  amplitude.init('add09b2b2ae2f99ca918b74a60bbe17e', undefined, {
    includeUtm: true,
    includeReferrer: true,
  })
}

// TODO: separate event on domain
type AnalyticsEvent =
  | 'Register'
  | 'Sign_in'
  | 'search'
  | 'post_start_create'
  | 'post_close_creation'
  | 'post_publish'
  | 'comment_start_create'
  | 'comment_close_creation'
  | 'comment_publish'
  | 'sign_in_send_code'
  | 'sign_in_confirm_phone'
  | 'sign_in_open_form'
  | 'sign_in_close_form'
  | 'add_reaction'
  | 'remove_reaction'
  | 'reaction_list'
  | 'search_Input'
  | 'search_start'
  | 'search_open_result'
  | 'user_follow'
  | 'user_unfollow'
  | 'post_complain'
  | 'search_open_area'
  // where
  | 'match_new_quiz_start'
  | 'match_quiz_step_start'
  | 'match_quiz_factors_bubble_click'
  | 'match_results_answers_updated'
  | 'match_results_zero_results'
  | 'match_results_region_score_details_viewed'
  | 'region_followed'
  | 'region_unfollowed'
  | 'match_results_alert'
  | 'match_description_view'
  | 'match_description_banner_closed'
  | 'match_results_mode_change'
  | 'area_media_gallery_viewed'
  | 'match_results_region_viewed'
  | 'area_pass_quiz_banner_shown'
  | 'match_share_banner_shown'
  | 'share_button_press'
  | 'address_input_try'
  | 'address_input_success'
  | 'match_quiz_area_input_try'
  | 'match_quiz_area_input_success'
  | 'match_quiz_removed_from_history'
  | 'match_results_zoom_to_area'
  // marketplace
  | 'mp_real_estate_button_click'
  | 'mp_main_page_viewed'
  | 'mp_filters_button_click'
  | 'mp_sorting_button_click'
  | 'mp_main_for_sale_for_rent_selector_click'
  | 'mp_main_filter_beds_click'
  | 'mp_filters_apply_click'
  | 'mp_feed_listing_preview_shown'
  | 'mp_map_listing_preview_viewed'
  | 'mp_feed_listing_preview_images_scrolling'
  | 'mp_detailed_listing_opened'
  | 'mp_detailed_listing_image_opened'
  | 'mp_detailed_listing_about_location'
  | 'mp_detailed_listing_locals_scrolling'
  | 'mp_detailed_listing_locals_says_open'
  | 'mp_detailed_listing_locals_feed_shown'
  | 'mp_detailed_listing_original_open'
  | 'mp_detailed_listing_contact_agent_click'
  | 'mp_listing_preview_contact_agent_click'
  | 'mp_contact_agent_submit_click'
  | 'mp_contact_agent_continue_search_click'
  | 'mp_favorites_listing_added'
  | 'mp_favorites_listing_removed'
  | 'mp_favorites_list_opened'
  | 'mp_favorites_listing_opened'
  | 'mp_group_pin_opened'
  | 'mp_services_main_page_opened'
  | 'mp_services_group_page_opened'
  | 'mp_services_search_opened'
  | 'mp_services_search_closed'
  | 'mp_services_quiz_start'
  | 'mp_services_quiz_lead_sended'
  | 'area_page_real_estate_count_banner'
  | 'area_page_feed_listing_preview_shown'
  | 'area_page_feed_listing_preview_show_more_click'
  | 'area_about_tab_click'
  | 'rm_step'
  | 'rm_task_action'
  | 'rm_task_creation_click'
  | 'subscription_payment_success'
  | 'support_widget_opened'
  | 'notifications_screen_opened'

export type SignInFormOpenFrom =
  | 'discovery'
  | 'post'
  | 'comment'
  | 'reaction'
  | 'toolbar'
  | 'mock'
  | 'follow'
  | 'quiz'
  | 'relocation-marketplace'

export type ResultsRegionViewedData = {
  quizId: string
  regionId: string
  source: 'list' | 'map'
}

export type ShareButtonPressData = {
  method: SharingMethod
  type: ContentType
}

type GoogleAnalytics = {
  push(options: { [index: string]: string; event: string }): void
}

export class AnalyticsFacade {
  _amplitude = amplitude
  _googleAnalytics: GoogleAnalytics

  constructor() {
    if (isServer) {
      this._googleAnalytics = []
    } else {
      this._googleAnalytics =
        // @ts-ignore
        window.dataLayer = window.dataLayer || []
    }
  }

  login({
    method,
    userId,
    userSegmentFilter,
    isNewUser,
  }: {
    method: 'google' | 'facebook' | 'phone' | 'apple'
    userId: string
    userSegmentFilter?: string | undefined
    isNewUser: boolean
  }) {
    const eventName = isNewUser ? 'Register' : 'Sign_in'
    if (userSegmentFilter) {
      this._sendEvent(eventName, {
        method,
        user_id: userId,
        user_segment_filter: userSegmentFilter,
      })
      this._identify(userId, userSegmentFilter)
    } else {
      this._sendEvent(eventName, { method, user_id: userId })
    }
  }

  search(text: string) {
    this._sendEvent('search', { text })
  }

  startCreatePost() {
    this._sendEvent('post_start_create')
  }

  closeCreationPost() {
    this._sendEvent('post_close_creation')
  }

  publishPost() {
    this._sendEvent('post_publish')
  }

  publishComment() {
    this._sendEvent('comment_publish')
  }

  closeCreationComment() {
    this._sendEvent('comment_close_creation')
  }

  startCreateComment() {
    this._sendEvent('comment_start_create')
  }

  sendSMSCode() {
    this._sendEvent('sign_in_send_code')
  }

  confirmPhone() {
    this._sendEvent('sign_in_confirm_phone')
  }

  openSignInForm(from: SignInFormOpenFrom) {
    this._sendEvent('sign_in_open_form', {
      from,
    })
  }

  closeSignInForm() {
    this._sendEvent('sign_in_close_form')
  }

  addReaction(type: ReactionType) {
    this._sendEvent('add_reaction', { type })
  }

  removeReaction() {
    this._sendEvent('remove_reaction')
  }

  // where
  removeQuizFromHistory({ quizId }: { quizId: string }) {
    this._sendEvent('match_quiz_removed_from_history', {
      quiz_id: quizId,
    })
  }

  newQuizStart({
    //change to ad cause https://nicity.atlassian.net/browse/LA-1111
    source: ad,
  }: {
    source:
      | 'starting_page'
      | 'quiz_history'
      // TODO: add when appear
      | 'region_page'
  }) {
    this._sendEvent('match_new_quiz_start', { ad })
  }
  quizStepStart({
    quizId,
    stepName,
  }: {
    quizId: string
    stepName: Quiz['steps'][number]['entity'] | 'flexibility' | 'search_area'
  }) {
    this._sendEvent('match_quiz_step_start', {
      quiz_id: quizId,
      step_name: stepName,
    })
  }
  quizFactorsBubbleClick({
    quizId,
    bubbleTitle,
  }: {
    quizId: string
    bubbleTitle: string
  }) {
    this._sendEvent('match_quiz_factors_bubble_click', {
      quiz_id: quizId,
      bubble_title: bubbleTitle,
    })
  }
  resultsZoomToArea({
    quizId,
    regionId,
  }: {
    quizId: string
    regionId: string
  }) {
    this._sendEvent('match_results_zoom_to_area', {
      quiz_id: quizId,
      region_id: regionId,
    })
  }
  resultsAnswersUpdated({ quizId }: { quizId: string }) {
    this._sendEvent('match_results_answers_updated', {
      quiz_id: quizId,
    })
  }
  resultsZeroResults({ quizId }: { quizId: string }) {
    this._sendEvent('match_results_zero_results', {
      quiz_id: quizId,
    })
  }
  resultsRegionScoreDetailsViewed({
    quizId,
    regionId,
    //change to ad cause https://nicity.atlassian.net/browse/LA-1111
    source: ad,
  }: {
    quizId: string
    regionId: string
    source: 'map' | 'list'
  }) {
    this._sendEvent('match_results_region_score_details_viewed', {
      quiz_id: quizId,
      region_id: regionId,
      ad,
    })
  }
  regionFollowed({ regionId }: { regionId: string }) {
    this._sendEvent('region_followed', {
      region_id: regionId,
    })
  }
  regionUnfollowed({ regionId }: { regionId: string }) {
    this._sendEvent('region_unfollowed', {
      region_id: regionId,
    })
  }
  resultsAlert({
    quizId,
    type,
  }: {
    quizId: string
    type: 'empty_quiz' | 'empty_property_answers' | 'search_area_expanded'
  }) {
    this._sendEvent('match_results_alert', {
      quiz_id: quizId,
      type,
    })
  }
  descriptionView() {
    this._sendEvent('match_description_view')
  }
  descriptionBannerClosed() {
    this._sendEvent('match_description_banner_closed')
  }
  resultsModeChange({ changeTo }: { changeTo: 'to_map' | 'to_list' }) {
    this._sendEvent('match_results_mode_change', { change_to: changeTo })
  }
  areaMediaGalleryViewed({ src }: { src: string }) {
    this._sendEvent('area_media_gallery_viewed', { src })
  }
  resultsRegionViewed({
    quizId,
    regionId,
    //change to ad cause https://nicity.atlassian.net/browse/LA-1111
    source: ad,
  }: ResultsRegionViewedData) {
    this._sendEvent('match_results_region_viewed', {
      quiz_id: quizId,
      region_id: regionId,
      ad,
    })
  }
  areaPassQuizBannerShown() {
    this._sendEvent('area_pass_quiz_banner_shown')
  }
  //change to ad cause https://nicity.atlassian.net/browse/LA-1111
  addressInputTry({ source: ad }: { source: string }) {
    this._sendEvent('address_input_try', {
      ad,
    })
  }
  //change to ad cause https://nicity.atlassian.net/browse/LA-1111
  addressInputSuccess({ source: ad }: { source: string }) {
    this._sendEvent('address_input_success', {
      ad,
    })
  }

  //change to ad cause https://nicity.atlassian.net/browse/LA-1111
  areaInputTry({ source: ad }: { source: string }) {
    this._sendEvent('match_quiz_area_input_try', {
      ad,
    })
  }
  //change to ad cause https://nicity.atlassian.net/browse/LA-1111
  areaInputSuccess({ source: ad }: { source: string }) {
    this._sendEvent('match_quiz_area_input_success', {
      ad,
    })
  }

  matchShareBannerShown({
    quizId,
    //change to ad cause https://nicity.atlassian.net/browse/LA-1111
    source: ad,
  }: {
    quizId: string
    source: 'map' | 'list'
  }) {
    this._sendEvent('match_share_banner_shown', { quiz_id: quizId, ad })
  }

  shareButtonPress({ method, type }: ShareButtonPressData) {
    this._sendEvent('share_button_press', { method, type })
  }

  reactionList() {
    this._sendEvent('reaction_list')
  }

  searchInput() {
    this._sendEvent('search_Input')
  }

  searchStart(text: string) {
    this._sendEvent('search_start', { text })
  }

  searchOpenResult(text: string) {
    this._sendEvent('search_open_result', { text })
  }

  //change to ad cause https://nicity.atlassian.net/browse/LA-1111
  userFollow(source: string) {
    this._sendEvent('user_follow', { ad: source })
  }
  //change to ad cause https://nicity.atlassian.net/browse/LA-1111
  userUnfollow(source: string) {
    this._sendEvent('user_unfollow', { ad: source })
  }

  postComplain(userName: string) {
    this._sendEvent('post_complain', { userName })
  }

  //change to ad cause https://nicity.atlassian.net/browse/LA-1111
  searchOpenArea(source: string) {
    this._sendEvent('search_open_area', { ad: source })
  }
  // Marketplace
  MPRealEstateButtonClick() {
    this._sendEvent('mp_real_estate_button_click', {})
  }
  MPMainPageViewed() {
    this._sendEvent('mp_main_page_viewed', {})
  }
  MPFavoritesListingAdded() {
    this._sendEvent('mp_favorites_listing_added', {})
  }
  MPFavoritesListingRemoved() {
    this._sendEvent('mp_favorites_listing_removed', {})
  }
  MPFavoritesListOpened() {
    this._sendEvent('mp_favorites_list_opened', {})
  }
  MPFavoritesListingOpened() {
    this._sendEvent('mp_favorites_listing_opened', {})
  }
  MPServicesMainPageOpened() {
    this._sendEvent('mp_services_main_page_opened', {})
  }
  MPServicesGroupPageOpened(
    serviceGroupName: RelocationMarketplaceServiceGroupName,
  ) {
    this._sendEvent('mp_services_group_page_opened', { serviceGroupName })
  }
  MPServicesSearchOpened() {
    this._sendEvent('mp_services_search_opened', {})
  }
  MPServicesSearchClosed() {
    this._sendEvent('mp_services_search_closed', {})
  }
  MPServicesQuizStartStart(serviceName: RelocationMarketplaceServiceName) {
    this._sendEvent('mp_services_quiz_start', { serviceName })
  }
  MPServicesQuizLeadSended(serviceName: RelocationMarketplaceServiceName) {
    this._sendEvent('mp_services_quiz_lead_sended', { serviceName })
  }
  MPFiltersButtonClick() {
    this._sendEvent('mp_filters_button_click', {})
  }
  MPSortingButtonClick() {
    this._sendEvent('mp_sorting_button_click', {})
  }
  MPMainForSaleForRentSelectorClick() {
    this._sendEvent('mp_main_for_sale_for_rent_selector_click', {})
  }
  MPMainFilterBedsClick() {
    this._sendEvent('mp_main_filter_beds_click', {})
  }
  MPFiltersApplyClick() {
    this._sendEvent('mp_filters_apply_click', {})
  }
  MPFeedListingPreviewShown(listingId: string) {
    this._sendEvent('mp_feed_listing_preview_shown', { listingId })
  }
  MPMapListingPreviewViewed(listingId: string) {
    this._sendEvent('mp_map_listing_preview_viewed', { listingId })
  }
  MPFeedListingPreviewImagesScrolling() {
    this._sendEvent('mp_feed_listing_preview_images_scrolling', {})
  }
  MPDetailedListingOpened() {
    this._sendEvent('mp_detailed_listing_opened', {})
  }
  MPDetailedListingImageOpened() {
    this._sendEvent('mp_detailed_listing_image_opened', {})
  }
  MPDetailedListingAboutLocation() {
    this._sendEvent('mp_detailed_listing_about_location', {})
  }
  MPDetailedListingLocalsScrolling() {
    this._sendEvent('mp_detailed_listing_locals_scrolling', {})
  }
  MPDetailedListingLocalsSaysOpen() {
    this._sendEvent('mp_detailed_listing_locals_says_open', {})
  }
  MPDetailedListingLocalsFeedShown() {
    this._sendEvent('mp_detailed_listing_locals_feed_shown', {})
  }
  MPDetailedListingOriginalOpen() {
    this._sendEvent('mp_detailed_listing_original_open', {})
  }
  MPDetailedListingContactAgentClick() {
    this._sendEvent('mp_detailed_listing_contact_agent_click', {})
  }
  MPListingPreviewContactAgentClick(listingId: string) {
    this._sendEvent('mp_listing_preview_contact_agent_click', { listingId })
  }
  MPContactAgentSubmitClick() {
    this._sendEvent('mp_contact_agent_submit_click', {})
  }
  MPGroupPinOpened() {
    this._sendEvent('mp_group_pin_opened', {})
  }
  MPContactAgentContinueSearchClick() {
    this._sendEvent('mp_contact_agent_continue_search_click', {})
  }
  AreaPageRealEstateCountBanner() {
    this._sendEvent('area_page_real_estate_count_banner', {})
  }
  areaPageAboutTabClick(
    changeTo:
      | 'photo_and_video'
      | 'description'
      | 'match_scores'
      | 'demographics'
      | 'transportation'
      | 'housing',
  ) {
    this._sendEvent('area_about_tab_click', {
      change_to: changeTo,
    })
  }
  // TODO use
  AreaPageFeedListingPreviewShown() {
    this._sendEvent('area_page_feed_listing_preview_shown', {})
  }
  AreaPageFeedListingPreviewShowMoreClick() {
    this._sendEvent('area_page_feed_listing_preview_show_more_click', {})
  }
  // relocation marketplace
  relocationMarketplaceStep(
    stepName:
      | 'origin_set'
      | 'destination_set'
      | 'project_started'
      | 'relocation_quiz_started'
      | 'tasks_shown',
  ) {
    this._sendEvent('rm_step', {
      step_name: stepName,
    })
  }
  relocationMarketplaceTaskAction(
    name: string,
    action:
      | 'completed'
      | 'dismissed'
      | 'un_dismissed'
      | 'un_completed'
      | 'details_opened'
      | 'edited'
      | 'created',
    type: 'task' | 'subtask',
  ) {
    this._sendEvent('rm_task_action', {
      name,
      action,
      type,
    })
  }
  relocationMarketplaceTaskCreationClick(type: 'task' | 'subtask') {
    this._sendEvent('rm_task_creation_click', {
      type,
    })
  }
  subscriptionPaymentSuccess(type: 'optimal' | 'premium', priceID: string) {
    this._sendEvent('subscription_payment_success', {
      type,
      priceID,
    })
  }
  supportWidgetOpened() {
    this._sendEvent('support_widget_opened')
  }
  notificationsScreenOpened() {
    this._sendEvent('notifications_screen_opened')
  }
  private debug = false
  private _sendEvent(
    eventName: AnalyticsEvent,
    properties?: Record<string, string>,
  ) {
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log(eventName, properties)
    }

    if (WITH_ANALYTICS) {
      this._amplitude.logEvent(eventName, properties)
      this._googleAnalytics.push({
        event: eventName,
        ...properties,
      })
    }
  }

  private _identify(userId: string, userSegmentFilter: string) {
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log(userId, userSegmentFilter)
    }
    const identify = new this._amplitude.Identify()
      .set('user_segment_filter', userSegmentFilter)
      .set('user_id', userId)
    this._amplitude.identify(identify)
  }
}
