import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { offset, shift, useFloating } from '@floating-ui/react-dom'

import { SearchServicesModal } from '@/components/shared/SearchServicesModal'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { NavLink as NavLinkBase } from '@/components/ui-kit/NavLink'
import { QUERY_RELOCATION_PROJECT } from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

const CONTENT_WIDTH_DESKTOP = '88vw'
const CONTENT_MAX_WIDTH_DESKTOP = '88.8rem'

type Props = {
  className?: string
}
export const HeaderNavigation: FC<Props> = ({ className }) => {
  const { data: relocationProjectData } = useQuery(QUERY_RELOCATION_PROJECT)
  const relocationHref = relocationProjectData?.relocationProject
    ? ROUTES.dashboard.calcUrl()
    : ROUTES.relocationMarketplace.calcUrl({})

  const [isModalVisible, setIsModalVisible] = useState(false)

  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'bottom',
    middleware: [offset(32), shift({ padding: 16 })],
  })

  return (
    <Container className={className}>
      <NavLink
        path={[
          ROUTES.relocationMarketplace.as,
          ROUTES.relocationMarketplaceServiceGroup.as,
          ROUTES.relocationMarketplaceService.as,
          ROUTES.dashboard.as,
        ]}
        href={relocationHref}
        shallow
      >
        Relocation
      </NavLink>
      <AllServicesButton
        onClick={() => {
          setIsModalVisible(true)
        }}
        ref={reference}
      >
        All services
      </AllServicesButton>
      {isModalVisible && (
        <SearchServicesModal
          style={{
            position: strategy,
            top: y ?? '',
            left: x ?? '',
            width: CONTENT_MAX_WIDTH_DESKTOP,
            maxWidth: CONTENT_WIDTH_DESKTOP,
          }}
          onRequestClose={() => {
            setIsModalVisible(false)
          }}
          ref={floating}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  height: 100%;

  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 1.6rem;
`
const NavLink = styled(NavLinkBase)`
  display: flex;
  align-items: center;

  color: ${getColorTheme('mercury')};
  white-space: nowrap;

  font-weight: 500;
  font-size: 1.6rem;

  &.active,
  &:hover {
    color: ${getColorTheme('sun')};
  }
`

const AllServicesButton = styled(NormalizedButton)`
  display: flex;
  align-items: center;

  color: ${getColorTheme('mercury')};
  white-space: nowrap;

  font-weight: 500;
  font-size: 1.6rem;

  &.active,
  &:hover {
    color: ${getColorTheme('sun')};
  }
`
