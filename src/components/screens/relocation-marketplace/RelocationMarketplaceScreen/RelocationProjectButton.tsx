import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { ArrowLeftIcon } from '@/images'
import { useAuthGlobalModals } from '@/modules/authorization'
import { QUERY_RELOCATION_PROJECT } from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

type Props = {
  className?: string
}

export const RelocationProjectButton: FC<Props> = ({ className }) => {
  const [isNotHavePermission, showModal] = useAuthGlobalModals(
    'relocation-marketplace',
  )

  const { data: relocationProjectData } = useQuery(QUERY_RELOCATION_PROJECT)

  const locationsSelected =
    relocationProjectData?.relocationProject?.whereFromRegionId &&
    relocationProjectData?.relocationProject.whereToRegionId

  return (
    <Link
      href={
        locationsSelected
          ? ROUTES.dashboard.calcUrl()
          : ROUTES.launchRelocation.calcUrl({})
      }
      passHref
      key={'relocation-project'}
    >
      <Container
        className={className}
        onClick={(event) => {
          if (isNotHavePermission) {
            showModal()
            event.preventDefault()
          }
        }}
      >
        <Text>
          <Title>Start relocation project</Title>
          <Subtitle>with Nicity</Subtitle>
        </Text>
        <Button>
          <ArrowIcon />
        </Button>
      </Container>
    </Link>
  )
}

const Container = styled.a`
  padding: 0 1.6rem;
  height: 6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 1.2rem;
  background: ${getColorTheme('strokeDefaultPrimary')};
`

const Text = styled.div``

const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`

const Subtitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultSecondary')};
`

const Button = styled(NormalizedButton)`
  width: 3.2rem;
  height: 3.2rem;

  border-radius: 10rem;
  background: ${getColorTheme('backgroundAccentPrimary')};
`

const ArrowIcon = styled(ArrowLeftIcon)`
  width: 2rem;

  position: relative;
  top: 0.2rem;

  transform: rotate(180deg);

  & > * {
    fill: ${getColorTheme('iconQuaternary')};
  }
`
