import { FC, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { ArrowIcon } from '@/images'
import { ROUTES } from '@/modules/router'
import { useIntersectionalObserver } from '@/modules/utils/useIntersectionalObserver'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export const SMALL_HEADER_SIZE = '7.2rem'
export const SMALL_HEADER_GAP = '1.6rem'
export const SMALL_HEADER_SIZE_MOBILE = '3.2rem'

type Props = {
  children?: ReactNode
  regionName: string
  regionSlug: string
}
export const Header: FC<Props> = ({ children, regionName, regionSlug }) => {
  const router = useRouter()

  const [isHeaderVisible, setIsHeaderVisible] = useState(true)

  const [useRef, entry] = useIntersectionalObserver({
    threshold: 0,
  })

  useEffect(() => {
    if (entry) {
      setIsHeaderVisible(entry?.isIntersecting)
    }
  }, [entry])

  const onBack = () => {
    const isNewPage = window.history.state.idx === 0

    if (isNewPage) {
      router.push(
        ROUTES.area.calcUrl({
          regionSlug,
        }),
      )
    } else {
      router.back()
    }
  }
  return (
    <>
      <SmallContainer isVisible={!isHeaderVisible}>
        <Top isOnSmallHeader>
          <BackButton
            viewType={'ghost'}
            size={'small'}
            onClick={onBack}
            Icon={<ArrowIcon direction={'left'} />}
          />
          <HeaderTitle>About {regionName}</HeaderTitle>
        </Top>
        {children}
      </SmallContainer>
      <Container ref={useRef}>
        <Top>
          <BackButton
            viewType={'ghost'}
            size={'small'}
            onClick={onBack}
            Icon={<ArrowIcon direction={'left'} />}
          />
          <HeaderTitle>About {regionName}</HeaderTitle>
        </Top>
        {children}
      </Container>
    </>
  )
}
const Container = styled.div`
  width: 100%;
  padding: 1.6rem;

  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;
`
const SmallContainer = styled.div<{
  isVisible: boolean
}>`
  width: 100%;
  padding: 1.6rem;
  z-index: 10;

  position: sticky;
  top: 0;

  display: grid;
  grid-auto-flow: row;
  gap: ${SMALL_HEADER_GAP};

  border-radius: 2.4rem;
  box-shadow: ${(props) =>
    props.isVisible
      ? '0px 2px 8px rgba(18, 21, 31, 0.04), 0px 6px 24px rgba(18, 21, 31, 0.1);'
      : 'none'};
  transform: ${(props) =>
    props.isVisible ? 'translateY(0)' : 'translateY(-100%)'};
  transition: transform 0.225s ease, box-shadow 0.225s ease;
  background: ${getColorTheme('earth')};

  ${mobileMedia} {
    position: fixed;
    top: 0;

    padding: 0.8rem 1.6rem;

    display: ${(props) => (props.isVisible ? 'block' : 'none')};
  }
`
const Top = styled.div<{ isOnSmallHeader?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: start;

  ${mobileMedia} {
    ${(props) => {
      if (props.isOnSmallHeader) {
        return 'display: none;'
      }
    }};
  }
`
const BackButton = styled(Button)`
  margin-right: 0.8rem;
`
const HeaderTitle = styled.div`
  font-size: 2.8rem;
  color: ${getColorTheme('sun')};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${mobileMedia} {
    font-size: 2.4rem;
  }
`
