import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ViewTimeEntityType } from '__generated__/globalTypes'
import { useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import throttle from 'lodash/throttle'

import { DetailedListingMeta } from '@/components/screens/DetailedListingScreen/DetailedListingMeta'
import { AreaLayout } from '@/components/shared/AreaLayout'
import { LoadingState } from '@/components/shared/LoadingState'
import { DetailedListingMap } from '@/components/shared/maps/DetailedListingMap'
import { Loader } from '@/components/ui-kit/Loader'
import { listhubInitScript, sendListhubEvent } from '@/modules/listhub'
import { QUERY_GET_DETAILED_LISTING } from '@/modules/listing'
import { mapServiceLocator, QUERY_GET_REGION_BY_SLUG } from '@/modules/map'
import { MUTATION_ADD_VIEW_TIMES_WITH_COUNT } from '@/modules/map/graphql/mutation-add-view-times-with-count'
import { ROUTES } from '@/modules/router'
import { useIntersectionalObserver } from '@/modules/utils/useIntersectionalObserver'

import { DetailedListingContent } from './DetailedListingContent'
import { HeaderTitleWithNavBar } from './DetailedListingContent/HeaderTitleWithNavBar'

const AUTO_SCROLL_TIME = 1000

export const DetailedListingScreen: FC = () => {
  const router = useRouter()
  const displayStartTime = useRef(0)
  const [addViewTimes] = useMutation(MUTATION_ADD_VIEW_TIMES_WITH_COUNT)
  const [isShowShadow, setIsShowShadow] = useState(false)

  const listingId = (router.query?.listingId?.[
    router.query?.listingId.length - 1
  ] || '') as string

  const areaSlug = router.query.regionSlug as string
  const { data: detailedListingData, loading: isDetailedListingLoading } =
    useQuery(QUERY_GET_DETAILED_LISTING, {
      ssr: true,
      skip: !listingId,
      variables: { id: listingId },
      onCompleted: () => {
        sendListhubEvent('DETAIL_PAGE_VIEWED', listingId)
      },
    })
  const { data: areaData } = useQuery(QUERY_GET_REGION_BY_SLUG, {
    ssr: true,
    skip: !areaSlug,
    variables: { slug: areaSlug },
  })

  const detailedListingInfo = detailedListingData?.getDetailedListing

  useEffect(() => {
    if (detailedListingInfo) {
      mapServiceLocator.getDetailedListingMapAsync().then((mapFacade) => {
        mapFacade.setCurrentListing(detailedListingInfo)
        mapFacade.highlightRegionBySlug(detailedListingInfo.slug as string)

        if (detailedListingInfo.point) {
          const { long, lat } = detailedListingInfo.point
          mapFacade.drawPropertyMarker([long, lat])
        }
      })
    }
  }, [detailedListingInfo, listingId])

  const areaTitle = areaData?.getRegionBySlug?.name || ''
  const homeAddress =
    detailedListingData?.getDetailedListing?.listingInfo.address || ''
  const propertyType =
    detailedListingData?.getDetailedListing?.listingInfo.propertyType || ''

  const onBack = () => {
    const isNewPage = window.history.state.idx === 0

    if (isNewPage) {
      router.push(
        ROUTES.areaRealEstate.calcUrl({
          regionSlug: router.query.regionSlug as string,
        }),
      )
    } else {
      router.back()
    }
  }

  const {
    currentTab,
    setCurrentTab,
    tabs,
    matchingTabs,
    isNavBarVisible,
    galleryRef,
    contentRef,
    summaryRefs,
    setSkipScrollHandler,
    onContentScroll,
  } = usePopupNavBar()

  const changeTab = (newTab: string) => {
    setSkipScrollHandler(true)

    matchingTabs[newTab]?.target.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })

    setTimeout(() => {
      setSkipScrollHandler(false)
    }, AUTO_SCROLL_TIME)
    setCurrentTab(newTab)
  }

  useEffect(() => {
    if (!detailedListingInfo?.internalID) return

    displayStartTime.current = new Date().getTime()
    return () => {
      const currentTime = new Date().getTime()
      addViewTimes({
        variables: {
          input: [
            {
              entityID: detailedListingInfo?.internalID,
              entityType: ViewTimeEntityType.LISTING_VIEW,
              duration: currentTime - displayStartTime.current,
            },
          ],
        },
      })
    }
  }, [detailedListingInfo?.internalID, addViewTimes])

  return (
    <AreaLayout
      map={() => <DetailedListingMap />}
      withSubNavigation={false}
      isShowBackButtonDesktop={false}
      onContentScroll={(event) => {
        onContentScroll()
        setIsShowShadow((event.target as HTMLFormElement).scrollTop !== 0)
      }}
      contentRef={contentRef}
      onRequestBack={onBack}
    >
      <DetailedListingMeta
        areaTitle={areaTitle}
        homeAddress={homeAddress}
        propertyType={propertyType}
        mediaUrl={detailedListingData?.getDetailedListing?.media?.[0]?.url}
      />
      <HiddenTitle>
        Read detailed information about property {propertyType} by {homeAddress}{' '}
        in {areaTitle} on Nicity
      </HiddenTitle>
      <LoadingState
        loading={isDetailedListingLoading}
        loadingComponent={<Loader color={'neptune'} size={'medium'} />}
      >
        {detailedListingInfo && (
          <HeaderTitleWithNavBar
            listingId={detailedListingInfo.id}
            internalId={detailedListingInfo.internalID}
            tabs={tabs}
            title={detailedListingInfo.listingInfo.address}
            isNavBarVisible={isNavBarVisible}
            onRequestBack={onBack}
            currentTab={currentTab}
            setCurrentTab={changeTab}
            propertyType={detailedListingInfo.listingInfo.propertyType}
            isShowShadow={isShowShadow}
          />
        )}
        {detailedListingInfo && (
          <DetailedListingContent
            detailedListingInfo={detailedListingInfo}
            galleryRef={galleryRef}
            summaryRefs={summaryRefs}
            isNavBarVisible={isNavBarVisible}
          />
        )}
      </LoadingState>
      <Script
        id={'listhub'}
        dangerouslySetInnerHTML={{ __html: listhubInitScript }}
      />
    </AreaLayout>
  )
}

const HiddenTitle = styled.h1`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`

const usePopupNavBar = (neighborhood?: string) => {
  type Tab =
    | 'Description'
    | 'What Locals Say'
    | 'Property Facts'
    | 'Open Houses'
    | ('Neighboorhood' | string)
  const [currentTab, setCurrentTab] = useState<Tab>('Description')

  const Neighboorhood = neighborhood || 'Neighboorhood'

  const [mainInfoRef, mainInfoEntry] = useIntersectionalObserver({})
  const [quizResultPartRef, quizResultPartEntry] = useIntersectionalObserver({})
  const [whatLocalsSayRef, whatLocalsSayEntry] = useIntersectionalObserver({})
  const [propertyFactsRef, propertyFactsEntry] = useIntersectionalObserver({})
  const [openHousesRef, openHousesEntry] = useIntersectionalObserver({})

  const galleryRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isNavBarVisible, setIsNavBarVisible] = useState(false)
  const [skipScrollHandler, setSkipScrollHandler] = useState(false)

  let mobileSheet: Element | null = null
  if (typeof window === 'object') {
    mobileSheet =
      document?.getElementById('RSBSComponent')?.children?.[0] || null
  }

  const summaryRefs = {
    mainInfoRef,
    quizResultPartRef,
    whatLocalsSayRef,
    propertyFactsRef,
    openHousesRef,
  }

  const matchingTabs = useMemo(
    () => ({
      Description: mainInfoEntry,
      [Neighboorhood]: quizResultPartEntry,
      'Property Facts': propertyFactsEntry,
      'What Locals Say': whatLocalsSayEntry,
      'Open Houses': openHousesEntry,
    }),
    [
      mainInfoEntry,
      quizResultPartEntry,
      whatLocalsSayEntry,
      propertyFactsEntry,
      openHousesEntry,
      Neighboorhood,
    ],
  )

  const tabs = Object.keys(matchingTabs) as Tab[]

  const onScrollHandler = useCallback(() => {
    const currentTabEntry = matchingTabs[currentTab]
    const content = mobileSheet ?? contentRef.current

    if (
      skipScrollHandler ||
      !currentTabEntry ||
      !content ||
      !galleryRef.current
    )
      return

    const currentTabIndex = tabs.findIndex((el) => el === currentTab)
    const prevTabIndex = currentTabIndex > 0 ? currentTabIndex - 1 : null
    const nextTabIndex =
      currentTabIndex < tabs.length - 1 ? currentTabIndex + 1 : null

    const { top: contentTop, height: contentHeight } =
      content.getBoundingClientRect()
    const contentMiddlePosition = contentTop + contentHeight / 2 // compare relative to the middle of the sidebar

    const { top: currentTabTop, height: currentTabHeight } =
      currentTabEntry?.target.getBoundingClientRect()
    const currentTabMiddlePosition = currentTabTop + currentTabHeight / 2

    //looking for the minimum distance to the center of the content (delta)
    const resultDelta = [
      {
        tab: currentTab,
        delta: Math.abs(contentMiddlePosition - currentTabMiddlePosition),
      },
    ]

    if (
      prevTabIndex !== null &&
      matchingTabs[tabs[prevTabIndex]]?.isIntersecting
    ) {
      const { top: prevTabTop, height: prevTabHeight } = matchingTabs[
        tabs[prevTabIndex]
      ]?.target.getBoundingClientRect() as DOMRect
      const prevTabMiddlePosition = prevTabTop + prevTabHeight / 2

      resultDelta.push({
        tab: tabs[prevTabIndex],
        delta: Math.abs(contentMiddlePosition - prevTabMiddlePosition),
      })
    }

    if (
      nextTabIndex !== null &&
      matchingTabs[tabs[nextTabIndex]]?.isIntersecting
    ) {
      const { top: nextTabTop, height: nextTabHeight } = matchingTabs[
        tabs[nextTabIndex]
      ]?.target.getBoundingClientRect() as DOMRect
      const nextTabMiddlePosition = nextTabTop + nextTabHeight / 2

      resultDelta.push({
        tab: tabs[nextTabIndex],
        delta: Math.abs(contentMiddlePosition - nextTabMiddlePosition),
      })
    }

    let min = resultDelta[0]
    resultDelta.forEach((item) => {
      if (item.delta < min.delta) min = item
    })

    setCurrentTab(min.tab)

    const galleryTop = galleryRef.current?.getBoundingClientRect().top
    if (galleryTop < 0) setIsNavBarVisible(true)
    else setIsNavBarVisible(false)
  }, [
    mobileSheet,
    galleryRef,
    contentRef,
    currentTab,
    setCurrentTab,
    tabs,
    matchingTabs,
    skipScrollHandler,
  ])

  const onContentScroll = throttle(onScrollHandler, 100)

  return {
    currentTab,
    setCurrentTab,
    tabs,
    matchingTabs,
    isNavBarVisible,
    galleryRef,
    contentRef,
    summaryRefs,
    skipScrollHandler,
    setSkipScrollHandler,
    onContentScroll,
  }
}
