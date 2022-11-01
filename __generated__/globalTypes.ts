/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CommentEntityType {
  POST = "POST",
}

export enum ComplaintEntityType {
  COMMENT = "COMMENT",
  POST = "POST",
  USER = "USER",
}

export enum DrillDownGrade {
  AVERAGE = "AVERAGE",
  BAD = "BAD",
  GOOD = "GOOD",
  OUTSTANDING = "OUTSTANDING",
  POOR = "POOR",
}

export enum DrillDownType {
  DIVERSITY = "DIVERSITY",
  HOUSING = "HOUSING",
  PUBLIC_TRANSPORTATION = "PUBLIC_TRANSPORTATION",
  SOCIAL_LIFE = "SOCIAL_LIFE",
}

export enum EntityType {
  GROUP = "GROUP",
  POST = "POST",
  PROFILE = "PROFILE",
  REGION = "REGION",
  TAG = "TAG",
}

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
  OTHER = "OTHER",
}

export enum HousingPropertyType {
  APARTMENTS = "APARTMENTS",
  HOUSE = "HOUSE",
}

export enum HousingRooms {
  FOUR_BEDROOM = "FOUR_BEDROOM",
  ONE_BEDROOM = "ONE_BEDROOM",
  STUDIO = "STUDIO",
  THREE_BEDROOM = "THREE_BEDROOM",
  TWO_BEDROOM = "TWO_BEDROOM",
}

export enum HousingTransactionType {
  BUY = "BUY",
  RENT = "RENT",
}

export enum ListingBathrooms {
  ROOMS_1 = "ROOMS_1",
  ROOMS_1_HALF = "ROOMS_1_HALF",
  ROOMS_2 = "ROOMS_2",
  ROOMS_3 = "ROOMS_3",
  ROOMS_4 = "ROOMS_4",
  ROOMS_ANY = "ROOMS_ANY",
}

export enum ListingBedrooms {
  ROOMS_1 = "ROOMS_1",
  ROOMS_2 = "ROOMS_2",
  ROOMS_3 = "ROOMS_3",
  ROOMS_4 = "ROOMS_4",
  ROOMS_5 = "ROOMS_5",
  ROOMS_ANY = "ROOMS_ANY",
  ROOMS_STUDIO = "ROOMS_STUDIO",
}

export enum ListingBuildingCondition {
  EXISTING = "EXISTING",
  NEW = "NEW",
  PENDING = "PENDING",
}

export enum ListingBuildingType {
  APARTMENTS = "APARTMENTS",
  CONDOS = "CONDOS",
  HOUSES = "HOUSES",
  MULTI_FAMILY = "MULTI_FAMILY",
  OTHERS = "OTHERS",
  TOWNHOUSES = "TOWNHOUSES",
}

export enum ListingOrder {
  DAYS_ON_MARKET_ASC = "DAYS_ON_MARKET_ASC",
  DAYS_ON_MARKET_DESC = "DAYS_ON_MARKET_DESC",
  PRICE_ASC = "PRICE_ASC",
  PRICE_DESC = "PRICE_DESC",
}

export enum ListingTransactionType {
  FOR_RENT = "FOR_RENT",
  FOR_SALE = "FOR_SALE",
}

export enum MediaType {
  IMAGE = "IMAGE",
  MAP = "MAP",
  VIDEO = "VIDEO",
}

export enum NotificationTargetType {
  COMMENT = "COMMENT",
  POST = "POST",
  REACTION = "REACTION",
  SUBSCRIPTION = "SUBSCRIPTION",
}

export enum NotificationType {
  COMMENT_COMMENTED = "COMMENT_COMMENTED",
  NEW_SUBSCRIBER = "NEW_SUBSCRIBER",
  POST_COMMENTED = "POST_COMMENTED",
  REACTION_COMMENT = "REACTION_COMMENT",
  REACTION_POST = "REACTION_POST",
  SUBSCRIPTIONS_POST = "SUBSCRIPTIONS_POST",
}

export enum PostType {
  EVENT = "EVENT",
  POST = "POST",
}

export enum ProductType {
  SERVICE = "SERVICE",
}

export enum QuizState {
  CALCULATED = "CALCULATED",
  IRRELEVANT = "IRRELEVANT",
  PENDING = "PENDING",
  STALE = "STALE",
}

export enum QuizStepSliderType {
  BUY = "BUY",
  RENT = "RENT",
}

export enum ReactionEntityType {
  COMMENT = "COMMENT",
  POST = "POST",
}

export enum ReactionType {
  ANGRY = "ANGRY",
  FUNNY = "FUNNY",
  LIKE = "LIKE",
  SAD = "SAD",
  SUPER = "SUPER",
}

export enum RegionMediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export enum RelocationProjectTodoStatus {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_DONE = "NOT_DONE",
  SKIPPED = "SKIPPED",
}

export enum RelocationProjectTodoType {
  SYSTEM = "SYSTEM",
  USER = "USER",
}

export enum SearchType {
  ALL = "ALL",
  REGION = "REGION",
}

export enum StepType {
  BUBBLES = "BUBBLES",
  LOCATIONS = "LOCATIONS",
  MULTISELECT = "MULTISELECT",
  REGIONGROUPS = "REGIONGROUPS",
  SELECT = "SELECT",
  TABSLIDERS = "TABSLIDERS",
}

export enum SubscriptableType {
  GROUP = "GROUP",
  REGION = "REGION",
  USER = "USER",
}

export enum SubscriptionPlan {
  BASIC = "BASIC",
  OPTIMAL = "OPTIMAL",
  PREMIUM = "PREMIUM",
}

export enum ViewTimeEntityType {
  LISTING_CONTACT_AGENT = "LISTING_CONTACT_AGENT",
  LISTING_PREVIEW_VIEW = "LISTING_PREVIEW_VIEW",
  LISTING_VIEW = "LISTING_VIEW",
  POST = "POST",
}

export interface AddCommentInput {
  entityId: string;
  entityType: CommentEntityType;
  text: string;
  parentId?: string | null;
}

export interface AddReactionInput {
  entityId: string;
  entityType: ReactionEntityType;
  type: ReactionType;
}

export interface AddViewTimeInput {
  entityID: string;
  entityType: ViewTimeEntityType;
  duration: number;
}

export interface BBoxInput {
  left: number;
  bottom: number;
  right: number;
  top: number;
}

export interface ChangeEmailStep1Input {
  newEmail: string;
}

export interface ChangeEmailStep2Input {
  id: string;
  code: string;
}

export interface ChangePhoneStep1Input {
  newPhone: string;
}

export interface ChangePhoneStep2Input {
  id: string;
  code: string;
}

export interface CreateComplaintInput {
  entityId: string;
  entityType: ComplaintEntityType;
  text?: string | null;
}

export interface CreatePostInput {
  regionId: string;
  type: PostType;
  content?: string | null;
  point?: number[] | null;
  media?: MediaInput[] | null;
  geoData?: any | null;
  tags?: string[] | null;
  groupId?: string | null;
}

export interface CreateSubscriptionInput {
  subscriptableType: SubscriptableType;
  subscriptableId: string;
}

export interface EditCommentInput {
  text: string;
}

export interface EditPostInput {
  content: string;
  point?: number[] | null;
  media?: MediaInput[] | null;
  geoData?: any | null;
  tags?: string[] | null;
  regionId?: string | null;
  groupId?: string | null;
}

export interface GetStaticMapUUIDInput {
  lon: number;
  lat: number;
  zoom?: number | null;
  width?: number | null;
  height?: number | null;
}

export interface LeadInput {
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone: string;
  email: string;
  message?: string | null;
  formURL: string;
  listingKey: string;
  certURL: string;
  leadType?: string | null;
  verificationRequestId?: string | null;
  isTest?: boolean | null;
}

export interface ListingFilterInput {
  transactionType: ListingTransactionType;
  buildingCondition?: ListingBuildingCondition[] | null;
  buildingType?: ListingBuildingType[] | null;
  bedrooms: ListingBedrooms;
  bathrooms: ListingBathrooms;
  minPrice?: number | null;
  maxPrice?: number | null;
  minSquareFeets?: number | null;
  maxSquareFeets?: number | null;
  minLotSize?: number | null;
  maxLotSize?: number | null;
  minYearBuilt?: number | null;
  maxYearBuilt?: number | null;
  addressSlug?: string | null;
  regionSlug?: string | null;
}

export interface MarketplaceRegionInput {
  query: string;
}

export interface MediaInput {
  url: string;
  type: MediaType;
  description?: string | null;
  sortKey?: number | null;
}

export interface NotificationSettingsSavedListingsSearchInput {
  sendEmailNotification: boolean;
}

export interface PointInput {
  x?: number | null;
  lat?: number | null;
  y?: number | null;
  long?: number | null;
}

export interface QuizRegionGroupInput {
  id: string;
  name: string;
}

export interface QuizStepResultBubblesInput {
  choices: string[];
}

export interface QuizStepResultLocationsInput {
  features: any[];
}

export interface QuizStepResultMultiSelectInput {
  choiceId: string;
  filters: string[];
}

export interface QuizStepResultRegionGroupsInput {
  regionGroups: QuizRegionGroupInput[];
}

export interface QuizStepResultSelectInput {
  choiceId: string;
  filter: string;
}

export interface QuizStepResultSliderInput {
  choiceId: string;
  type: QuizStepSliderType;
  value: number;
}

export interface RelocationProjectTodoInput {
  id?: string | null;
  title: string;
  description?: string | null;
  status: RelocationProjectTodoStatus;
  type: RelocationProjectTodoType;
  serviceSlug?: string | null;
  guideLink?: string | null;
  parentId?: string | null;
  childrens?: (RelocationProjectTodoInput | null)[] | null;
}

export interface RelocationProjectTodosInput {
  limit: number;
  offset: number;
  statuses?: (RelocationProjectTodoStatus | null)[] | null;
}

export interface RelocationSaveUserProjectInput {
  whereFromRegionId?: string | null;
  whereToRegionId?: string | null;
}

export interface RelocationTodoStatusInput {
  id: string;
  status: RelocationProjectTodoStatus;
}

export interface SearchFeaturesInput {
  GroupID?: string | null;
}

export interface SearchGroupsInput {
  id?: string | null;
  ids?: (string | null)[] | null;
  authorId?: string | null;
  name?: string | null;
  regionId?: string | null;
  regionSlug?: string | null;
  limit?: number | null;
  position?: number | null;
  slug?: string | null;
  memberUserId?: string | null;
}

export interface UpdateProfileInput {
  userName: string;
  firstName: string;
  lastName: string;
  gender?: Gender | null;
  birthdate?: any | null;
  bio: string;
  phone: string;
  photoUrl: string;
  coverUrl: string;
}

export interface VerificationCodeInput {
  requestId: string;
  code: number;
}

export interface drillDownMedianPriceRequest {
  locationSlug: string;
  transactionType?: HousingTransactionType | null;
  propertyType?: HousingPropertyType | null;
  roomsType?: HousingRooms | null;
}

export interface drillDownsRequest {
  locationSlug: string;
  drillDownType: DrillDownType;
}

export interface searchNotificationsRequest {
  userId: string;
  IsOld?: boolean | null;
  offset?: number | null;
  limit?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
