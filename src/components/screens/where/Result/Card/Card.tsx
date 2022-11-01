import { FC, useRef, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import {
  arrow,
  autoPlacement,
  limitShift,
  offset,
  shift,
} from '@floating-ui/react-dom'
import {
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react-dom-interactions'

import {
  FactorScore as Factor,
  FactorScoreModel,
} from '@/components/shared/FactorScore'
import { SharePopup as SharePopupBase } from '@/components/shared/ShareDropdown'
import { Button } from '@/components/ui-kit/Button'
import { Option, Options } from '@/components/ui-kit/form/Options'
import { BigPlusIcon, InfoIcon, LocationIcon, MinusIcon } from '@/images'
import { ShareIcon } from '@/images'
import { useAnalytics, useViewTime } from '@/modules/analytics'
import {
  mapServiceLocator,
  QUERY_GET_REGION_BY_SLUG,
  SubscriptableType,
} from '@/modules/map'
import {
  useFollowNeighborhood,
  useUnfollowNeighborhood,
} from '@/modules/neighbourhood'
import { ROUTES } from '@/modules/router'
import { API_HOST } from '@/modules/utils/config'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import {
  mobileMedia,
  notDesktopMedia,
  notMobileMedia,
  tabletMedia,
} from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Badges as BadgesBase } from './Badges'
import { FactorsScore as FactorsScoreBase } from './FactorsScore'
import { Preview as PreviewBase } from './Preview'
import { Slider } from './Slider'

type Props = {
  scrollElement: Element | null
  id: string
  badges: string[]
  score: number
  subtitle: string
  neighborhood: string
  image: string | null
  factorsScores: FactorScoreModel[]
  subscribed: boolean
  slug: string
  quizId: string
  className?: string
  index: number
  isShowWarningNoHaveSearchParameters: boolean
  onHover: () => void
  onLeave: () => void
  onInfoOpen?: () => void
  totalSessionsCount: number
}

export const Card: FC<Props> = ({
  scrollElement,
  quizId,
  id,
  badges,
  score,
  subtitle,
  neighborhood,
  image,
  factorsScores,
  subscribed,
  isShowWarningNoHaveSearchParameters,
  slug,
  index,
  className,
  onHover,
  onLeave,
  onInfoOpen,
  totalSessionsCount,
}) => {
  const { unfollowNeighborhood, followNeighborhood } =
    useSubscriptionController(id)
  const ref = useViewTime(scrollElement, {
    quizId,
    regionId: id,
    source: 'list',
  })
  const [isShowSharePopup, setIsShowSharePopup] = useState(false)
  const closeSharePopup = () => setIsShowSharePopup(false)
  const openSharePopup = () => setIsShowSharePopup(true)

  // TODO don't get for every card
  const { data: { getRegionBySlug: region } = {} } = useQuery(
    QUERY_GET_REGION_BY_SLUG,
    {
      variables: { slug: slug },
    },
  )

  const gallery =
    region?.media && region.media.filter(({ type }) => type !== 'VIDEO')

  const focusOnLocation = () => {
    // @ts-ignore
    const { top, right, bottom, left } = region?.bbox
    const bbox = {
      top: Number(top),
      right: Number(right),
      bottom: Number(bottom),
      left: Number(left),
    }
    const mapFacade = mapServiceLocator.getWhereResultsMap()
    mapFacade?.fitBbox(bbox)
  }
  const areaWhereUrl = ROUTES.areaWhere.calcUrl({ regionSlug: slug, quizId })

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeSharePopup()
    }
  }

  const arrowRef = useRef(null)
  const [isOpenScores, setIsOpenScores] = useState(false)
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    strategy: 'fixed',
    middleware: [
      offset(16),
      autoPlacement(),
      shift(),
      arrow({ element: arrowRef }),
    ],
  })

  const staticSide =
    {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]] || 'top'

  const arrowStyles = {
    left: arrowX != null ? `${arrowX}px` : '',
    top: arrowY != null ? `${arrowY}px` : '',
    right: '',
    bottom: '',
    [staticSide]: '-0.75rem',
  }

  const {
    x: shareX,
    y: shareY,
    reference: shareReference,
    floating: shareFloating,
    strategy: shareStrategy,
    context: shareContext,
  } = useFloating({
    open: isShowSharePopup,
    onOpenChange: (isShowSharePopup) => {
      setIsShowSharePopup(isShowSharePopup)
    },
    placement: 'bottom',
    strategy: 'fixed',
    middleware: [
      offset(8),
      shift({
        limiter: limitShift({
          offset: ({ rects }) => ({
            mainAxis: rects.floating.width,
          }),
        }),
      }),
    ],
  })

  const {
    getReferenceProps: getShareReferenceProps,
    getFloatingProps: getShareFloatingProps,
  } = useInteractions([
    useDismiss(shareContext, {
      ancestorScroll: true,
    }),
  ])

  const shareReferenceProps = getShareReferenceProps({ ref: shareReference })
  const shareFloatingProps = {
    ...getShareFloatingProps({ ref: shareFloating }),
    style: {
      position: shareStrategy,
      top: shareY ?? '',
      left: shareX ?? '',
    },
  }

  const analytics = useAnalytics()

  return (
    <Link href={areaWhereUrl} passHref>
      <Container
        ref={ref}
        className={className}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <ImageContainer>
          {gallery && gallery.length > 0 ? (
            <Slider gallery={gallery} />
          ) : (
            <Preview src={image} index={index} />
          )}
        </ImageContainer>
        <Content
          ref={reference}
          isShowWarningNoHaveSearchParameters={
            isShowWarningNoHaveSearchParameters
          }
        >
          <InfoWrapper>
            <Location>
              <span>
                {region?.placeType.charAt(0).toUpperCase()}
                {region?.placeType.slice(1)}
              </span>{' '}
              {subtitle}
            </Location>
            <Neighborhood>
              <span>{neighborhood}</span>
            </Neighborhood>
            <Badges badges={badges} place={'body'} />
          </InfoWrapper>

          {isShowWarningNoHaveSearchParameters ? (
            <NoParametersFactorsScore
              source={'list'}
              quizId={quizId}
              neighborhoodId={id}
              neighborhood={neighborhood}
              total={score}
              scores={factorsScores}
              isShowWarningNoHaveSearchParameters={
                isShowWarningNoHaveSearchParameters
              }
              onOpen={() => setIsOpenScores(true)}
              onClose={() => setIsOpenScores(false)}
            />
          ) : (
            <>
              <Footer>
                <SeeDetailsButton viewType={'primary'} size={'small'}>
                  See details
                </SeeDetailsButton>
                <LocationButton
                  Icon={<LocationIcon />}
                  size={'small'}
                  viewType={'secondary'}
                  onClick={(event) => {
                    event.preventDefault()
                    focusOnLocation()
                    analytics.resultsZoomToArea({ quizId, regionId: id })
                  }}
                />
                {isShowSharePopup && (
                  <SharePopup
                    {...shareFloatingProps}
                    url={`${API_HOST}${areaWhereUrl}`}
                    contentType={'match'}
                    onClose={closeSharePopup}
                  />
                )}
                <OptionsWrapper {...shareReferenceProps}>
                  <Options
                    onOpenChange={onOpenChange}
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                    }}
                  >
                    {subscribed ? (
                      <Option
                        icon={<MinusIcon />}
                        onClick={(event) => {
                          event.preventDefault()
                          unfollowNeighborhood()
                        }}
                      >
                        Remove from favorites
                      </Option>
                    ) : (
                      <Option
                        icon={<BigPlusIcon />}
                        onClick={(event) => {
                          event.preventDefault()
                          followNeighborhood()
                        }}
                      >
                        Add to favorites
                      </Option>
                    )}
                    <Option icon={<ShareIcon />} onClick={openSharePopup}>
                      Share
                    </Option>
                  </Options>
                </OptionsWrapper>
              </Footer>
              <FactorsScore
                source={'list'}
                quizId={quizId}
                neighborhoodId={id}
                neighborhood={neighborhood}
                total={score}
                scores={factorsScores}
                isShowWarningNoHaveSearchParameters={
                  isShowWarningNoHaveSearchParameters
                }
                onInfoOpen={onInfoOpen}
                totalSessionsCount={totalSessionsCount}
                onOpen={() => setIsOpenScores(true)}
                onClose={() => setIsOpenScores(false)}
              />
            </>
          )}
          {isOpenScores && (
            <ScoresPopup
              onClick={(event) => event.stopPropagation()}
              ref={floating}
              style={{ position: strategy, top: y ?? '', left: x ?? '' }}
            >
              <Arrow ref={arrowRef} style={arrowStyles} />
              {factorsScores.map((score) => (
                <Factor key={score.name} {...score} />
              ))}
              <LearnMoreLink
                onClick={() => {
                  onInfoOpen?.()
                  setIsOpenScores(false)
                }}
              >
                <InfoIcon />
                <LinkText>Learn more about how Where works</LinkText>
              </LearnMoreLink>
            </ScoresPopup>
          )}
        </Content>
      </Container>
    </Link>
  )
}

const useSubscriptionController = (neighborhoodId: string) => {
  const [unfollow] = useUnfollowNeighborhood({
    update(cache, { data }) {
      const status = data?.removeSubscriptionBySubscriptable?.status
      if (status) {
        cache.modify({
          id: `QuizResultLocation:${neighborhoodId}`,
          fields: {
            subscribed: () => false,
          },
        })
      } else {
        // eslint-disable-next-line no-console
        console.error('not unfollow')
      }
    },
  })
  const [follow] = useFollowNeighborhood({
    update(cache, { data }) {
      const status = Boolean(data?.createSubscription)
      if (status) {
        cache.modify({
          id: `QuizResultLocation:${neighborhoodId}`,
          fields: {
            subscribed: () => true,
          },
        })
      } else {
        // eslint-disable-next-line no-console
        console.error('not unfollow')
      }
    },
  })
  return {
    unfollowNeighborhood: () => {
      unfollow({
        variables: {
          subscriptableId: neighborhoodId,
        },
      })
    },
    followNeighborhood: () => {
      follow({
        variables: {
          input: {
            subscriptableId: neighborhoodId,
            subscriptableType: SubscriptableType.REGION,
          },
        },
      })
    },
  }
}

const Container = styled.a`
  width: 100%;

  display: flex;

  position: relative;

  transition: ${HOVER_TRANSITION_TIME};
  cursor: pointer;

  background: #ffffff;
  border-radius: 1.6rem;

  &:hover {
    box-shadow: 0 4px 12px rgba(158, 169, 178, 0.08),
      0 2px 4px rgba(0, 0, 0, 0.08), 0 3.78px 33.4221px rgba(0, 0, 0, 0.08);
  }
  ${mobileMedia} {
    flex-direction: column;
  }
  ${notMobileMedia} {
    height: 20.8rem;
  }
`
const ImageContainer = styled.div`
  width: 29.2rem;
  max-height: 20.8rem;
  border-radius: 1.2rem;

  ${notDesktopMedia} {
    width: 18.8rem;
  }

  ${tabletMedia} {
    width: 14rem;
  }

  ${mobileMedia} {
    min-width: 100%;
    width: 100%;

    overflow: hidden;

    border-radius: 1.6rem;
    @supports (aspect-ratio: 16 / 9) {
      aspect-ratio: 16 / 9;
    }
    @supports not (aspect-ratio: 16 / 9) {
      height: 16.4rem;
    }
  }

  flex-shrink: 0;

  z-index: 10;
`
const Preview = styled(PreviewBase)`
  width: 100%;
  height: 100%;
`
const Content = styled.div<{ isShowWarningNoHaveSearchParameters: boolean }>`
  min-width: 0;

  padding: 1.6rem;

  display: flex;
  flex-direction: column;
  flex: 1 1 0;

  position: relative;

  ${notDesktopMedia} {
    ${({ isShowWarningNoHaveSearchParameters }) =>
      isShowWarningNoHaveSearchParameters ? '' : 'min-height: 16.4rem;'};
  }
`
const InfoWrapper = styled.div`
  width: calc(100% - 5rem);
`
const Location = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('sun500')};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  & > span {
    color: ${getColorTheme('sun1000')};
  }
`
const Neighborhood = styled.div`
  margin-bottom: 1.2rem;

  display: flex;
  & > span {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.4rem;
    letter-spacing: -0.04em;
    color: ${getColorTheme('sun1000')};

    text-overflow: ellipsis;
    overflow: hidden;

    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
`
const Badges = styled(BadgesBase)``
const NoParametersFactorsScore = styled(FactorsScoreBase)`
  margin-top: auto;

  ${notDesktopMedia} {
    margin-top: 0.4rem;
  }
`
const FactorsScore = styled(FactorsScoreBase)`
  position: absolute;
  top: 0;
  right: 0;

  ${mobileMedia} {
    top: -1.6rem;
  }
`
const LearnMoreLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('neptune600')};
`

const LinkText = styled.div`
  border-bottom: 1px solid ${getColorTheme('neptune600')};
`

const OptionsWrapper = styled.div``

const LocationButton = styled(Button)`
  ${notDesktopMedia} {
    display: none;
  }
`
const SharePopup = styled(SharePopupBase)`
  z-index: 100;

  ${mobileMedia} {
    left: unset !important;
    right: 3.2rem !important;
  }
`
const ScoresPopup = styled.div`
  width: 28.8rem;
  padding: 1.8rem 1.6rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  z-index: 100;

  background: #ffffff;
  border-radius: 1.6rem;
  box-shadow: 0 4px 12px rgba(158, 169, 178, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.08), 0 3.78px 33.4221px rgba(0, 0, 0, 0.08);

  ${mobileMedia} {
    display: none;
  }
`
const Arrow = styled.div`
  width: 1.5rem;
  height: 1.5rem;

  position: absolute;

  transform: rotate(45deg);

  background: ${getColorTheme('earth')};
  border-radius: 0.2rem;
`
const Footer = styled.div`
  margin-top: auto;

  display: flex;
  gap: 1.2rem;

  ${notDesktopMedia} {
    padding-top: 1.6rem;
  }

  ${tabletMedia} {
    gap: 0.6rem;
  }
`
const SeeDetailsButton = styled(Button)`
  flex-grow: 1;
`
