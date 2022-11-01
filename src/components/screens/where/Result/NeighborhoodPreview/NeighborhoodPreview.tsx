import { useRef, useState, VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import {
  arrow,
  autoPlacement,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom'

import { Slider } from '@/components/screens/where/Result/Card/Slider'
import {
  FactorScore as Factor,
  FactorScoreModel,
} from '@/components/shared/FactorScore'
import { InfoIcon } from '@/images'
import { useViewTime } from '@/modules/analytics'
import { QUERY_GET_REGION_BY_SLUG } from '@/modules/map'
import { ROUTES } from '@/modules/router'
import { isServer } from '@/modules/utils/is-server'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Badges as BadgesBase } from '../Card/Badges'
import { FactorsScore as FactorsScoreBase } from '../Card/FactorsScore'
import { Preview } from '../Card/Preview'

type Props = {
  id: string
  badges: string[]
  score: number
  subtitle: string
  neighborhood: string
  slug: string
  image: string | null
  factorsScores: FactorScoreModel[]
  className?: string
  isShowWarningNoHaveSearchParameters: boolean
  quizId: string
  index: number
}

export const NeighborhoodPreview: VFC<Props> = ({
  id,
  badges,
  score,
  subtitle,
  quizId,
  neighborhood,
  slug,
  image,
  factorsScores,
  className,
  index,
  isShowWarningNoHaveSearchParameters,
}) => {
  // TODO: refactor with all useViewTime
  const ref = useViewTime(
    isServer ? null : document.querySelector('.mapboxgl-map'),
    {
      quizId,
      regionId: id,
      source: 'map',
    },
  )
  const areaWhereUrl = ROUTES.areaWhere.calcUrl({ regionSlug: slug, quizId })

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

  const { data: { getRegionBySlug: region } = {} } = useQuery(
    QUERY_GET_REGION_BY_SLUG,
    {
      variables: { slug: slug },
    },
  )

  const gallery = region?.media && region.media

  return (
    <Link href={areaWhereUrl} passHref>
      <Wrapper ref={reference} onMouseMove={(event) => event.stopPropagation()}>
        <Container className={className} ref={ref}>
          <ImageContainer>
            {gallery && gallery.length > 0 ? (
              <Slider gallery={gallery} />
            ) : (
              <Preview src={image} index={index} />
            )}
            <Badges badges={badges} max={2} place={'header'} />
          </ImageContainer>
          <Content>
            <Neighborhood>{neighborhood}</Neighborhood>
            <Location>{subtitle}</Location>
            <FactorsScore
              source={'map'}
              quizId={quizId}
              neighborhoodId={id}
              neighborhood={neighborhood}
              total={score}
              scores={factorsScores}
              isShowWarningNoHaveSearchParameters={
                isShowWarningNoHaveSearchParameters
              }
              isPreview
              onOpen={() => setIsOpenScores(true)}
              onClose={() => setIsOpenScores(false)}
            />
          </Content>
        </Container>
        {isOpenScores && (
          <ScoresPopup
            ref={floating}
            style={{ position: strategy, top: y ?? '', left: x ?? '' }}
          >
            <Arrow ref={arrowRef} style={arrowStyles} />
            {factorsScores.map((score) => (
              <Factor key={score.name} {...score} />
            ))}
            <LearnMoreLink>
              <InfoIcon />
              <LinkText>Learn more about how Where works</LinkText>
            </LearnMoreLink>
          </ScoresPopup>
        )}
      </Wrapper>
    </Link>
  )
}

const Container = styled.div`
  width: 30.4rem;

  display: flex;
  flex-direction: column;

  cursor: pointer;
  background: ${getColorTheme('earth')};
  border-radius: 1.6rem;
  box-shadow: 0px 4px 12px rgba(158, 169, 178, 0.08),
    0px 2px 4px rgba(0, 0, 0, 0.08), 0px 3.78px 33.4221px rgba(0, 0, 0, 0.08);
`

const Wrapper = styled.div``

const Content = styled.div`
  padding: 16px 16px 20px;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  position: relative;
`
const Location = styled.div`
  width: calc(100% - 5rem);

  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('sun')};
`
const Neighborhood = styled.div`
  width: calc(100% - 5rem);
  margin-bottom: 2px;

  display: flex;

  font-weight: 500;
  font-size: 2rem;
  line-height: 2rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};
`
const Badges = styled(BadgesBase)`
  position: absolute;
  top: 1.6rem;
  left: 1.6rem;

  z-index: 100;

  font-weight: 400;
  color: ${getColorTheme('sun')};
`
const FactorsScore = styled(FactorsScoreBase)`
  position: absolute;
  top: -1.6rem;
  right: 0;
`
const ImageContainer = styled.div`
  max-width: 100%;
  height: 16.4rem;

  position: relative;

  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;
  z-index: 2;
`

const ScoresPopup = styled.div`
  width: 28.8rem;
  padding: 1.8rem 1.6rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  position: absolute;

  background: #ffffff;
  border-radius: 1.6rem;
  box-shadow: 0 4px 12px rgba(158, 169, 178, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.08), 0 3.78px 33.4221px rgba(0, 0, 0, 0.08);

  ${mobileMedia} {
    display: none;
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

const Arrow = styled.div`
  width: 1.5rem;
  height: 1.5rem;

  position: absolute;

  transform: rotate(45deg);

  background: ${getColorTheme('earth')};
  border-radius: 0.2rem;
`
