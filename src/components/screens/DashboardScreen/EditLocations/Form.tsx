import { useState } from 'react'
import { FC } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useLocalStorage } from 'react-use'

import { WHERE_FROM_REGION_KEY } from '@/components/screens/LaunchRelocation/shared'
import { Step } from '@/components/screens/LaunchRelocation/Step'
import { Region } from '@/components/screens/LaunchRelocation/types'
import { WhereFromStepContent } from '@/components/screens/LaunchRelocation/WhereFromStepContent'
import { WhereToStepContent } from '@/components/screens/LaunchRelocation/WhereToStepContent'
import { Button } from '@/components/ui-kit/Button'
import {
  ArrowIcon,
  GeoSmallIcon as GeoSmallIconBase,
  LocationSmallIcon as LocationSmallIconBase,
  VerticalDotsIcon as VerticalDotsIconBase,
} from '@/images'
import {
  MUTATION_RELOCATION_SAVE_PROJECT,
  QUERY_RELOCATION_PROJECT,
} from '@/modules/relocation-project'
import { getColorTheme } from '@/styles/themes'

type Props = {
  onRequestClose: () => void
}
export const Form: FC<Props> = ({ onRequestClose }) => {
  const router = useRouter()

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
    <Container>
      <Header>
        <Button
          viewType={'ghost'}
          size={'small'}
          Icon={<ArrowIcon direction={'left'} />}
          onClick={onRequestClose}
        />
        Edit departure and destination
      </Header>
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
          onClick={() =>
            saveRelocationProject({
              variables: {
                input: {
                  whereFromRegionId: whereFromRegion.id,
                  whereToRegionId: whereToRegion.id,
                },
              },
              onCompleted: onRequestClose,
            })
          }
          disabled={loading}
        >
          Save
        </Button>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1.6rem;

  background: ${getColorTheme('earth')};
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
const Header = styled.div`
  padding: 1.6rem 0;
  margin-bottom: 0.8rem;

  display: grid;
  grid-auto-flow: column;
  gap: 3.2rem;
  align-items: center;
  justify-content: start;

  font-size: 1.8rem;
  font-weight: 500;
`
const StepsWrapper = styled.div`
  width: 100%;
  margin-bottom: 2.4rem;

  display: grid;
  grid-auto-flow: row;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  row-gap: 1.6rem;
  column-gap: 0.8rem;
`
