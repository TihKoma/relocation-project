import { FC } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { useSticky } from '@/components/shared/AreaLayout/use-sticky-header'
import { useContactFormModal } from '@/components/shared/ContactFormModal/contact-form-modal-context'
import { ShareDropdown } from '@/components/shared/ShareDropdown'
import { Button } from '@/components/ui-kit/Button'
import { ArrowIcon } from '@/images'
import { ShareIcon } from '@/images/postActions'
import { useAnalytics } from '@/modules/analytics'
import { useIsMobileDevice } from '@/modules/device'
import { API_HOST } from '@/modules/utils/config'
import { mobileMedia, notDesktopMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Tabs as TabsBase } from '../../ProfileScreen/ProfileLayout/follow/ListModal/FollowingList/Tabs'

type Props = {
  listingId: string
  internalId: string
  title?: string
  tabs: string[]
  isNavBarVisible: boolean
  currentTab: string
  propertyType: string
  isShowShadow?: boolean
  onRequestBack: () => void
  setCurrentTab: (tab: string) => void
}

export const HeaderTitleWithNavBar: FC<Props> = ({
  listingId,
  internalId,
  title,
  tabs,
  isNavBarVisible,
  currentTab,
  propertyType,
  isShowShadow,
  onRequestBack,
  setCurrentTab,
}) => {
  const { isFixed, scrollElementRef } = useSticky()
  const analytics = useAnalytics()

  const isMobile = useIsMobileDevice()
  const { showContactFormModal } = useContactFormModal()

  const { asPath } = useRouter()
  const currentPageUrl = `${API_HOST}${asPath}`

  const content = (
    <Header isShowShadow={isShowShadow}>
      <Container>
        {!isMobile && (
          <SubHeader>
            <Button
              viewType={'ghost'}
              size={'small'}
              Icon={<ArrowIcon direction={'left'} />}
              onClick={onRequestBack}
            />
            <Title isNavBarVisible={isNavBarVisible}>
              {title || 'Real Estate'}
            </Title>

            <OptionalPart isVisible={!isNavBarVisible}>
              <CtaButton
                viewType={'primary'}
                size={isMobile ? 'medium' : 'small'}
                onClick={() => {
                  analytics.MPDetailedListingContactAgentClick()
                  showContactFormModal(listingId, internalId, propertyType)
                }}
              >
                Get Connected
              </CtaButton>

              <ActionsBlock>
                <ShareDropdown url={currentPageUrl} contentType={'mp'}>
                  <Button
                    viewType={'ghost'}
                    size={'small'}
                    Icon={<ShareIcon />}
                  />
                </ShareDropdown>
              </ActionsBlock>
            </OptionalPart>
          </SubHeader>
        )}
        <TabsContainer css={isNavBarVisible ? TabsShow : ''}>
          <Tabs
            tabs={tabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            tabClassName={tabStyle}
          />
        </TabsContainer>
      </Container>
    </Header>
  )

  return (
    <>
      {!isMobile && content}
      {isFixed && isNavBarVisible && scrollElementRef.current
        ? createPortal(
            <StickyBehavior>{content}</StickyBehavior>,
            scrollElementRef.current,
          )
        : null}
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const SubHeader = styled.div`
  display: flex;
  flex-wrap: nowrap;

  margin-top: 1.3rem;
`
const Title = styled.div<{ isNavBarVisible: boolean }>`
  display: inline;
  white-space: nowrap;

  height: inherit;

  text-overflow: ellipsis;
  overflow: ${({ isNavBarVisible }) => (isNavBarVisible ? 'auto' : 'inherit')};

  font-size: 2.2rem;
  line-height: 3.6rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};
`
const OptionalPart = styled.div<{ isVisible: boolean }>`
  display: flex;

  margin-left: auto;

  transition: 1s;
  transform: ${({ isVisible }) => (isVisible ? 'scale(0)' : 'none')};
`
const TabsShow = css`
  max-height: 100px;
  transition: max-height 1s, margin-bottom 1s;

  &${SubHeader} {
    border: 1px solid blue;
  }
`
const Tabs = styled(TabsBase)`
  max-height: 0;
  transition: max-height 0.3s;
`
const TabsContainer = styled.div`
  height: 4.8rem;

  padding-top: 0.5rem;

  max-height: 0;
  transition: max-height 1s, margin-bottom 0.1s;

  overflow: auto;
`
const tabStyle = css`
  color: #12151f;

  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 400;
`

const Header = styled.div<{ isShowShadow?: boolean }>`
  min-height: 6.8rem;
  padding: 0 1.6rem;

  display: flex;
  align-items: center;
  flex-shrink: 0;

  background: ${getColorTheme('earth')};
  border-radius: 2.4rem;

  position: sticky;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -o-sticky;
  position: -ms-sticky;

  top: 0;
  left: 0;
  z-index: 100;

  ${({ isShowShadow }) =>
    isShowShadow
      ? 'box-shadow: 0px 2px 8px rgba(18, 21, 31, 0.04), 0px 6px 24px rgba(18, 21, 31, 0.1);'
      : ''}

  ${mobileMedia} {
    border-radius: 2.4rem 2.4rem 0 0;
    min-height: 5.6rem;
  }
`
const StickyBehavior = styled.div`
  padding-top: 0;
  width: 100%;

  position: fixed;
  top: 0;

  z-index: 2;
  background-color: ${getColorTheme('earth')};
  border-radius: 1.6rem;
`

const CtaButton = styled(Button)`
  grid-column: -3 / -1;
  grid-row: 2 / 4;
  align-self: end;

  min-width: 17rem;

  ${notDesktopMedia} {
    grid-column: 1 / -1;
    grid-row: 4 / 5;
  }
  ${mobileMedia} {
    position: absolute;
    top: max(100% - 7.2rem, 250px);
    bottom: 100%;
    left: 1.6rem;

    width: calc(100% - 2 * 1.6rem);

    z-index: 2;
  }
`

const ActionsBlock = styled.div`
  margin-left: 1rem;

  ${mobileMedia} {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
  }
`
