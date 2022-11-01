import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useLocalStorage } from 'react-use'

import { Step } from '@/components/screens/LaunchRelocation/Step'
import { WhereFromStepContent } from '@/components/screens/LaunchRelocation/WhereFromStepContent'
import { WhereToStepContent } from '@/components/screens/LaunchRelocation/WhereToStepContent'
import { AreaLayout } from '@/components/shared/AreaLayout'
import { MetaTags } from '@/components/shared/MetaTags'
import { Button } from '@/components/ui-kit/Button'
import {
  GeoSmallIcon as GeoSmallIconBase,
  LocationSmallIcon as LocationSmallIconBase,
  VerticalDotsIcon as VerticalDotsIconBase,
} from '@/images'
import { useAnalytics } from '@/modules/analytics'
import {
  MUTATION_RELOCATION_SAVE_PROJECT,
  QUERY_RELOCATION_PROJECT,
} from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

import { WHERE_FROM_REGION_KEY } from './shared'
import { Region } from './types'

export const LaunchRelocation = () => {
  const router = useRouter()
  const analytics = useAnalytics()

  const [isProjectCreated, setIsProjectCreated] = useState(false)

  const [whereFromRegion, setWhereFromRegion] = useLocalStorage<Region>(
    WHERE_FROM_REGION_KEY,
  )

  const [whereToRegion, setWhereToRegion] = useState<Region | null>(null)

  useQuery(QUERY_RELOCATION_PROJECT, {
    ssr: true,
    onCompleted: (data) => {
      const { whereToRegionId, whereTo } = data.relocationProject ?? {}
      if (whereToRegionId && whereTo) {
        setWhereToRegion({
          id: whereToRegionId,
          name: whereTo,
          slug: '#',
        })
      }
    },
  })

  const [saveRelocationProject, { loading }] = useMutation(
    MUTATION_RELOCATION_SAVE_PROJECT,
    {
      onCompleted: () => {
        setIsProjectCreated(true)
      },
    },
  )

  return (
    <>
      <MetaTags
        title={
          'Nicity Virtual Relocation Assistant -  Take control of all moving tasks'
        }
      />
      <AreaLayout>
        <Container>
          <Title>My relocation</Title>
          <StepsWrapper>
            <IconsWrapper
              gridRowStart={whereToRegion && !whereFromRegion ? 2 : 1}
              gridRowEnd={whereToRegion ? 3 : whereFromRegion ? 2 : 1}
            >
              {whereFromRegion && <GeoSmallIcon />}
              {whereFromRegion && whereToRegion && <VerticalDotsIcon />}
              {whereToRegion && <LocationSmallIcon />}
            </IconsWrapper>
            <StepFrom
              badgeLabel={'Step 1'}
              title={'Where are you moving from?'}
              isActive={!whereFromRegion}
              selectedRegion={whereFromRegion}
              onSelect={(region) => setWhereFromRegion(region)}
              resultPrefix={'From'}
              gridColumnStart={whereFromRegion ? 2 : 1}
              content={(onSelectFromEdit) => {
                return (
                  <WhereFromStepContent
                    selectRegion={(region) => {
                      analytics.relocationMarketplaceStep('origin_set')
                      onSelectFromEdit?.()
                      setWhereFromRegion(region)
                    }}
                    selectedRegion={whereFromRegion ?? null}
                  />
                )
              }}
              withStepBage={router.query.from !== 'area'}
            />
            <StepTo
              badgeLabel={'Step 2'}
              title={'Where are you moving to?'}
              description={
                'At the moment, Nicity covers only relocation to United States'
              }
              selectedRegion={whereToRegion}
              onSelect={(region) => setWhereToRegion(region)}
              isActive={!!whereFromRegion}
              resultPrefix={'To'}
              gridColumnStart={whereToRegion ? 2 : 1}
              content={(onSelectFromEdit) => {
                return (
                  <WhereToStepContent
                    selectRegion={(region) => {
                      analytics.relocationMarketplaceStep('destination_set')
                      onSelectFromEdit?.()
                      setWhereToRegion(region)
                    }}
                    selectedRegion={whereToRegion}
                  />
                )
              }}
              withStepBage={router.query.from !== 'area'}
            />
          </StepsWrapper>
          {whereFromRegion && whereToRegion && !isProjectCreated && (
            <Button
              fullWidth
              onClick={() => {
                analytics.relocationMarketplaceStep('project_started')
                saveRelocationProject({
                  variables: {
                    input: {
                      whereFromRegionId: whereFromRegion.id,
                      whereToRegionId: whereToRegion.id,
                    },
                  },
                  onCompleted: () => {
                    router.push(ROUTES.dashboard.calcUrl())
                  },
                })
              }}
              disabled={loading}
            >
              Let’s start
            </Button>
          )}
        </Container>
      </AreaLayout>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 1.6rem;

  position: relative;

  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;
`
const IconsWrapper = styled.div<{
  gridRowStart: number
  gridRowEnd: number
}>`
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  grid-row: ${(props) => props.gridRowStart} / ${(props) => props.gridRowEnd};
  align-items: center;
`
const GeoSmallIcon = styled(GeoSmallIconBase)`
  width: 2.4rem;
  height: 2.4rem;

  fill: ${getColorTheme('iconSecondary')};
`
const LocationSmallIcon = styled(LocationSmallIconBase)`
  width: 2.4rem;
  height: 2.4rem;

  fill: ${getColorTheme('iconSecondary')};
`
const VerticalDotsIcon = styled(VerticalDotsIconBase)``
const StepFrom = styled(Step)<{ gridColumnStart: number }>`
  grid-column: ${(props) => props.gridColumnStart} / 3;
`
const StepTo = styled(Step)<{ gridColumnStart: number }>`
  grid-column: ${(props) => props.gridColumnStart} / 3;
`
const Title = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
`
const StepsWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-auto-flow: row;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  row-gap: 1.6rem;
  column-gap: 0.8rem;
`
