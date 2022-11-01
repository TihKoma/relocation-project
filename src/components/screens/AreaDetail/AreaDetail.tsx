import { FC, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import {
  Demographics,
  useIsShowDemographics,
} from '@/components/screens/where/Area/drillDown/Demographics'
import { Housing } from '@/components/screens/where/Area/drillDown/Housing'
import { useIsShowHousing } from '@/components/screens/where/Area/drillDown/Housing/useIsShowHousing'
import {
  TransportAndProximity,
  useIsShowTransportation,
} from '@/components/screens/where/Area/drillDown/Transportation'
import { AreaLayout } from '@/components/shared/AreaLayout'
import { Gallery as GalleryBase } from '@/components/shared/Gallery'
import { LoadingState } from '@/components/shared/LoadingState'
import { AreaMap } from '@/components/shared/maps/AreaMap'
import { MetaTags } from '@/components/shared/MetaTags'
import { RegionScores as RegionScoresBase } from '@/components/shared/RegionScores'
import { useIsShowScores } from '@/components/shared/RegionScores/useIsShowScores'
import {
  Tabs as TabsBase,
  TABS_HEIGHT,
  TabType,
} from '@/components/shared/Tabs'
import { Activity } from '@/components/ui-kit/Activity'
import { TextCollapse } from '@/components/ui-kit/TextCollapse'
import {
  DemographicsIcon,
  DescriptionIcon,
  HousePricingIcon,
  MediaIcon,
  ScoresIcon,
  TransportAndProximityIcon,
} from '@/images'
import { QUERY_GET_REGION_BY_SLUG } from '@/modules/map'
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_PAGE_DESCRIPTION,
  DEFAULT_PAGE_TITLE,
} from '@/modules/router'
import {
  neighbourhoodDescription,
  neighbourhoodKeywords,
  neighbourhoodTitle,
} from '@/modules/router/seo'
import { useIntersectionalObserver } from '@/modules/utils/useIntersectionalObserver'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Header, SMALL_HEADER_GAP, SMALL_HEADER_SIZE } from './Header'
import { OpenGraphMetaTags } from './OpenGraphMetaTags'

export const AreaDetail: FC = () => {
  const router = useRouter()
  const quizId = router.query.quizId as string | undefined
  const regionSlug = router.query.regionSlug as string
  const { data: { getRegionBySlug: region } = {}, loading } = useQuery(
    QUERY_GET_REGION_BY_SLUG,
    {
      variables: { slug: regionSlug },
      ssr: true,
    },
  )

  const showDemographics = useIsShowDemographics()
  const showTransportation = useIsShowTransportation()
  const showHousing = useIsShowHousing()
  const showScores = useIsShowScores(region?.id, quizId)
  const showMedia = region && region.media.length > 0
  const showDescription = region?.description

  const [currentTab, setCurrentTab] = useState<TabType | null>(null)

  const [setRefScores, entryScores, nodeScores] = useIntersectionalObserver({})
  const [setRefMedia, entryMedia, nodeMedia] = useIntersectionalObserver({})
  const [setRefDescription, entryDescription, nodeDescription] =
    useIntersectionalObserver({})
  const [setRefDemographics, entryDemographics, nodeDemographics] =
    useIntersectionalObserver({})
  const [setRefTransportation, entryTransportation, nodeTransportation] =
    useIntersectionalObserver({})
  const [setRefHousing, entryHousing, nodeHousing] = useIntersectionalObserver(
    {},
  )

  const tabs = useMemo(
    () => [
      {
        index: 'match-scores',
        label: 'Match scores',
        icon: <ScoresIcon />,
        isVisible: entryScores?.isIntersecting,
        node: nodeScores,
        needsToBeShown: showScores,
      },
      {
        index: 'photo-and-video',
        label: 'Photo and video',
        icon: <MediaIcon />,
        isVisible: entryMedia?.isIntersecting,
        node: nodeMedia,
        needsToBeShown: showMedia,
      },
      {
        index: 'demographics',
        label: 'Demographics',
        icon: <DemographicsIcon />,
        isVisible: entryDemographics?.isIntersecting,
        node: nodeDemographics,
        needsToBeShown: showDemographics,
      },
      {
        index: 'transportation',
        label: 'Transportation',
        icon: <TransportAndProximityIcon />,
        isVisible: entryTransportation?.isIntersecting,
        node: nodeTransportation,
        needsToBeShown: showTransportation,
      },
      {
        index: 'housing',
        label: 'Housing',
        icon: <HousePricingIcon />,
        isVisible: entryHousing?.isIntersecting,
        node: nodeHousing,
        needsToBeShown: showHousing,
      },
      {
        index: 'description',
        label: 'Description',
        icon: <DescriptionIcon />,
        isVisible: entryDescription?.isIntersecting,
        node: nodeDescription,
        needsToBeShown: region?.description,
      },
    ],
    [
      entryScores,
      nodeScores,
      showScores,
      entryMedia,
      nodeMedia,
      showMedia,
      entryDemographics,
      nodeDemographics,
      showDemographics,
      entryTransportation,
      nodeTransportation,
      showTransportation,
      entryHousing,
      nodeHousing,
      showHousing,
      entryDescription,
      nodeDescription,
      region,
    ],
  )

  useEffect(() => {
    if (tabs?.length && !currentTab) {
      setCurrentTab(tabs[0])
    }
  }, [tabs, currentTab])

  useEffect(() => {
    const firstVisibleTab = tabs.find((tab) => tab.isVisible)
    if (firstVisibleTab) {
      setCurrentTab(firstVisibleTab)
    }
  }, [tabs])

  const onClickTab = (tab: TabType) => {
    const tabData = tabs.find((item) => item.index === tab.index)
    setCurrentTab(tab)
    if (tabData) {
      tabData.node?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      {region ? (
        <MetaTags
          title={`${neighbourhoodTitle(
            `${region.name} in ${region.city}, ${region.country}`,
          )}`}
          description={`${neighbourhoodDescription(
            `${region.name} in ${region.city}, ${region.country}`,
          )}`}
          keywords={`${neighbourhoodKeywords(
            `${region.name} in ${region.city} – ${region.country}`,
          )}`}
        />
      ) : (
        <Head>
          <title>{DEFAULT_PAGE_TITLE}</title>
          <meta name={'description'} content={DEFAULT_PAGE_DESCRIPTION} />
          <meta property={'og:image'} content={DEFAULT_OG_IMAGE} />
        </Head>
      )}
      {region ? <OpenGraphMetaTags region={region} /> : null}
      <AreaLayout
        map={() => <AreaMap regionSlug={regionSlug} />}
        withSubNavigation={false}
      >
        <Container>
          <LoadingState loading={loading} loadingComponent={<Loader />}>
            {region && (
              <>
                <Header regionName={region.name} regionSlug={region.slug}>
                  <Tabs
                    setCurrentTab={onClickTab}
                    currentTab={currentTab}
                    tabs={tabs.filter((tab) => tab.needsToBeShown)}
                  />
                </Header>
                {showScores && (
                  <Section ref={setRefScores}>
                    <>
                      <RegionScoresTitle>Match scores</RegionScoresTitle>
                      <RegionScores
                        quizId={quizId}
                        regionId={region.id}
                        mini={false}
                      />
                    </>
                  </Section>
                )}
                {showMedia && (
                  <Section ref={setRefMedia}>
                    <Title>Photo and video</Title>
                    <Gallery gallery={region.media} withSwiper />
                  </Section>
                )}
                <Section ref={setRefDemographics}>
                  <Demographics />
                </Section>
                {showTransportation && (
                  <Section ref={setRefTransportation}>
                    <TransportAndProximity />
                  </Section>
                )}
                {showHousing && (
                  <Section ref={setRefHousing}>
                    <Housing />
                  </Section>
                )}
                {showDescription && (
                  <Section ref={setRefDescription}>
                    <DescriptionTitle>Description</DescriptionTitle>
                    <TextCollapse secondary countRow={7}>
                      {region.description}
                    </TextCollapse>
                  </Section>
                )}
              </>
            )}
          </LoadingState>
        </Container>
      </AreaLayout>
    </>
  )
}

const Container = styled.div`
  margin-top: calc(
    -${SMALL_HEADER_SIZE} - ${TABS_HEIGHT} - ${SMALL_HEADER_GAP}
  );
  position: relative;

  ${mobileMedia} {
    margin-top: 0;
  }
`
const RegionScores = styled(RegionScoresBase)`
  margin-bottom: 2.4rem;
`
const Gallery = styled(GalleryBase)`
  margin-bottom: 2.4rem;
`
const Loader = styled(Activity)`
  margin: auto;
`
const Title = styled.div`
  margin-bottom: 1.6rem;

  font-weight: 500;
  font-size: 2.4rem;
  line-height: 2.8rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun1000')};
  ${mobileMedia} {
    font-size: 2rem;
    line-height: 2.4rem;
  }
`
const RegionScoresTitle = styled(Title)`
  margin-bottom: 0.8rem;
`
const DescriptionTitle = styled(Title)`
  margin-bottom: 1.2rem;
`
const Tabs = styled(TabsBase)`
  background: ${getColorTheme('earth')};
`
const Section = styled.div`
  width: 100%;
  padding: 0 1.6rem;

  margin-bottom: 2.4rem;
`
