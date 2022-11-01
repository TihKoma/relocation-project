import Link from 'next/link'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { useAuthGlobalModals } from '@/modules/authorization'
import { QUERY_RELOCATION_PROJECT } from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

import { Item as ItemBase, Label, ServiceName } from './shared'

export const PersonalRelocationProjectPreview = () => {
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
      <Item
        onClick={(event) => {
          if (isNotHavePermission) {
            showModal()
            event.preventDefault()
          }
        }}
      >
        <Label>New</Label>
        <GuideItemContent>
          <GuideItemTitle>Manage moving from A to Z</GuideItemTitle>
          <GuideItemSubtitle>
            Take control of all moving tasks with Nicity Virtual Relocation
            Assistant
          </GuideItemSubtitle>
        </GuideItemContent>
        <ServiceName isInverted>Get moving</ServiceName>
      </Item>
    </Link>
  )
}

const Item = styled(ItemBase)`
  background-color: ${getColorTheme('backgroundDefaultSecondary')};
  border-radius: 1.6rem;
`
const GuideItemContent = styled.div`
  position: absolute;
  left: 3.2rem;
  bottom: 12rem;
`
const GuideItemTitle = styled.div`
  margin-bottom: 1.2rem;

  font-style: normal;
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 2.8rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`
const GuideItemSubtitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultSecondary')};
`
