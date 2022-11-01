import { FC, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { useIsNotMobileDevice } from '@/modules/device'
import { QUERY_SEARCH_GROUPS } from '@/modules/group'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { notMobileMedia } from '@/styles/media'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'
import { getColorTheme } from '@/styles/themes'

import { GroupsModal } from './GroupsModal'
import { Card } from './shared/Card'

type Props = {
  regionSlug: string
  regionId: string
}
export const Groups: FC<Props> = ({ regionSlug, regionId }) => {
  const [showLeftBlackout, setShowLeftBlackout] = useState(false)
  const [showRightBlackout, setShowRightBlackout] = useState(true)
  const isNotMobile = useIsNotMobileDevice()

  const { data } = useQuery(QUERY_SEARCH_GROUPS, {
    ssr: true,
    variables: {
      input: {
        regionSlug,
      },
    },
  })

  const groups = data?.searchGroups.groups

  const [modalIsOpened, setModalIsOpened] = useState(false)

  const openModal = () => {
    setModalIsOpened(true)
  }
  const closeModal = () => {
    setModalIsOpened(false)
  }

  const listRef = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current
      setShowLeftBlackout(!!scrollLeft)
      setShowRightBlackout(scrollLeft + clientWidth < scrollWidth)
    }
  }

  if (!groups?.length) {
    return null
  }
  return (
    <>
      <Container onClick={openModal}>
        {isNotMobile && (
          <Header>
            <b>{data?.searchGroups.total}</b> groups
          </Header>
        )}
        <GroupsList ref={listRef} onScroll={onScroll}>
          <Blackout isVisible={showLeftBlackout} position={'left'} />
          {groups.map((group) => {
            return (
              <Group
                key={group?.id}
                title={
                  group?.name.replace(
                    ` ${group?.region?.country}/${group?.region?.name}`,
                    '',
                  ) ?? ''
                }
                description={`${group?.members?.total} ${
                  group?.members?.total === 1 ? 'follower' : 'followers'
                }`}
                photoUrl={group?.avatar ?? ''}
              />
            )
          })}
          <Button size={'small'} viewType={'secondary'}>
            Show all groups
          </Button>
          <Blackout isVisible={showRightBlackout} position={'right'} />
        </GroupsList>
      </Container>
      <GroupsModal
        modalIsOpened={modalIsOpened}
        regionId={regionId}
        closeModal={closeModal}
      />
    </>
  )
}

const Container = styled.div`
  padding: 1.2rem 0;

  display: block;

  position: relative;

  transition: ${HOVER_TRANSITION_TIME};
  cursor: pointer;
  overflow: hidden;

  ${notMobileMedia} {
    min-height: 10.8rem;

    border: 0.1rem solid ${getColorTheme('sun50')};
    background: ${getColorTheme('earth')};
    border-radius: 1.6rem;

    &:hover {
      border-color: transparent;
      box-shadow: 0 2px 4px rgba(18, 21, 31, 0.08),
        0 4px 16px 1px rgba(18, 21, 31, 0.08);
    }
  }
`
const Header = styled.div`
  padding: 0 1.6rem;
  margin-bottom: 1.2rem;

  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun1000')};

  b {
    font-size: 2.4rem;
    line-height: 2.8rem;
    font-weight: 500;
  }
`

const GroupsList = styled.div`
  padding: 0 1.6rem;

  display: flex;
  flex-flow: row nowrap;
  flex-basis: auto;

  ${SCROLLBAR_DISPLAY_NONE_MIXIN};
  overflow-x: auto;
`
const Group = styled(Card)`
  &:not(:last-child) {
    margin-right: 1.6rem;
  }
`
const Blackout = styled.div<{ position: 'left' | 'right'; isVisible: boolean }>`
  height: 6rem;
  width: 2.4rem;

  position: absolute;
  ${(props) => props.position}: 0;
  bottom: 0;

  background: linear-gradient(
    ${(props) => {
      if (props.position === 'right') {
        return '270deg, #ffffff 0%, rgba(255, 255, 255, 0) 102.78%'
      }
      return '90deg, #ffffff 0%, rgba(255, 255, 255, 0) 102.78%'
    }}
  );

  transition: ${HOVER_TRANSITION_TIME};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
`
