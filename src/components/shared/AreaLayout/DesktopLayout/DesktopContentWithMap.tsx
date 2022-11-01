import { FC, MutableRefObject, ReactNode, UIEvent, useState } from 'react'
import styled from '@emotion/styled'

import { BackButton, HeaderModel } from '@/components/shared/AreaLayout/shared'
import { SubNavigation } from '@/components/shared/AreaLayout/SubNavigation'
import { ArrowIcon } from '@/images'
import {
  useOnScrollProvider,
  withInfinityScroll,
} from '@/modules/infinity-scroll'
import { getColorTheme } from '@/styles/themes'

type Props = {
  children: ReactNode
  subHeaderTitle?: string | JSX.Element
  isBackButtonVisible?: boolean
  theme: HeaderModel['theme']
  onRequestBack?: () => void
  onRequestClose?: () => void
  contentRef?: MutableRefObject<HTMLDivElement | null>
  onContentScroll?: (args: any) => void
  withSubNavigation?: boolean
  customHeader?: ReactNode
}
export const DesktopContentWithMap: FC<Props> = ({
  children,
  subHeaderTitle,
  isBackButtonVisible,
  theme,
  onRequestBack,
  customHeader,
  onRequestClose,
  contentRef,
  onContentScroll,
  withSubNavigation,
}) => {
  const [isShowShadow, setIsShowShadow] = useState(false)

  return (
    <Container>
      <ContentDesktop
        mode={theme}
        contentRef={contentRef}
        onScroll={(event) => {
          onContentScroll?.(event)
          setIsShowShadow((event.target as HTMLFormElement).scrollTop !== 0)
        }}
      >
        <>
          <SubHeader
            mode={theme}
            isShowShadow={isShowShadow}
            isHideDesktop={
              !(subHeaderTitle || onRequestBack || onRequestClose) ||
              !isBackButtonVisible ||
              !!customHeader
            }
          >
            {isBackButtonVisible && onRequestBack && (
              <BackButton onClick={onRequestBack}>
                <ArrowIcon direction={'left'} />
              </BackButton>
            )}
            <SubHeaderTitle>{subHeaderTitle}</SubHeaderTitle>
          </SubHeader>
          {children}
        </>
      </ContentDesktop>
      {withSubNavigation && <SubNavigation />}
    </Container>
  )
}

const gap = 2.4
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: ${gap}rem;

  display: grid;
  grid-template-columns: minmax(auto, 68.4rem) minmax(
          calc(50% - ${gap / 2}rem),
          1fr
  );
  gap: ${gap}rem;

  position: absolute;
  left: 0;
  top: 0;

  pointer-events: none;
  & > * {
    pointer-events: auto;
  }
}
`
const Content = styled.div<{ mode: HeaderModel['theme'] }>`
  display: flex;
  flex-direction: column;

  border-radius: 2.4rem;
  background: ${
    // TODO: move comomn function for reuse down
    (props) => getColorTheme(props.mode === 'light' ? 'earth' : 'sun50')
  };
  box-shadow: 0 2px 12px rgba(18, 21, 31, 0.02),
    0 8px 32px rgba(18, 21, 31, 0.12);

  overflow-y: auto;
`
type ContentDesktopProps = {
  id?: string
  mode: HeaderModel['theme']
  contentRef?: MutableRefObject<HTMLDivElement | null>
  children?: JSX.Element

  onScroll: (event: UIEvent) => void
}
const ContentDesktop = withInfinityScroll<ContentDesktopProps>(
  ({ onScroll, contentRef, ...props }) => {
    const infinityScroll = useOnScrollProvider()
    return (
      <Content
        {...props}
        ref={contentRef}
        onScroll={(event) => {
          onScroll?.(event)
          infinityScroll(event)
        }}
      />
    )
  },
)
const SubHeader = styled.div<{
  isShowShadow: boolean
  isHideDesktop: boolean
  mode: HeaderModel['theme']
}>`
  height: 6.8rem;
  min-height: 6.8rem;
  padding: 0 1.6rem;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  flex-shrink: 0;

  background: ${getColorTheme('earth')};
  border-radius: 2.4rem;

  font-weight: 500;
  font-size: 2.8rem;
  line-height: 3.6rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};

  ${({ isShowShadow }) =>
    isShowShadow
      ? `
    box-shadow: 0px 2px 8px rgba(18, 21, 31, 0.04), 0px 6px 24px rgba(18, 21, 31, 0.1);
  `
      : ''}
  ${({ isHideDesktop }) =>
    isHideDesktop
      ? 'padding: 0; height: 0; min-height: 0; box-shadow: none;'
      : ''}
`
const SubHeaderTitle = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
