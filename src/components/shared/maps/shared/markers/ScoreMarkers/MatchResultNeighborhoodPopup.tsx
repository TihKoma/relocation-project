import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { FloatingPortal } from '@floating-ui/react-dom-interactions'

// TODO: reexport
import { NeighborhoodPreview } from '@/components/screens/where/Result/NeighborhoodPreview'
import { NeighborhoodInfo } from '@/modules/quiz'

type Props = {
  neighborhood: NeighborhoodInfo
  onMouseLeave: () => void
  onMouseEnter: () => void
  withSteps: boolean
  quizId: string
  index: number
  style: { position: 'absolute' | 'fixed'; left: number | ''; top: number | '' }
}

export const MatchResultNeighborhoodPopup = forwardRef<HTMLDivElement, Props>(
  (
    {
      neighborhood,
      withSteps,
      quizId,
      onMouseEnter,
      onMouseLeave,
      index,
      ...props
    },
    ref,
  ) => {
    return (
      <FloatingPortal>
        <Container
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}
          ref={ref}
          {...props}
        >
          <NeighborhoodPreview
            slug={neighborhood.slug}
            id={neighborhood.id}
            quizId={quizId}
            neighborhood={neighborhood.neighborhood}
            image={neighborhood.image}
            subtitle={neighborhood.subtitle}
            badges={neighborhood.badges || []}
            score={neighborhood.score}
            factorsScores={neighborhood.factorsScores}
            isShowWarningNoHaveSearchParameters={!withSteps}
            index={index}
          />
        </Container>
      </FloatingPortal>
    )
  },
)

const Container = styled.div`
  font-family: EuclidCircularA, Segoe UI, Roboto, sans-serif; //TODO: change .mapboxgl-map font
`
