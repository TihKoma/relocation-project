import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'

import { Button, NormalizedButton } from '@/components/ui-kit/Button'
import { getColorTheme } from '@/styles/themes'

type Props = {
  className?: string
  countRow: number
  onClickText?: () => void
  isExpandButtonVisible?: boolean
  secondary?: boolean
  children: ReactNode
}
export const TextCollapse: FC<Props> = ({
  className,
  secondary,
  countRow,
  children,
  onClickText,
  isExpandButtonVisible = true,
}) => {
  const [isMore, setIsMore] = useState(false)
  const moreText = () => setIsMore(true)
  const lessText = () => setIsMore(false)
  const textRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  // TODO: fix render on server
  useEffect(() => {
    if (!isMore && buttonRef.current && textRef.current) {
      if (textRef.current.scrollHeight > textRef.current.clientHeight) {
        buttonRef.current.style.removeProperty('display')
      } else {
        buttonRef.current.style.display = 'none'
      }
    }
  }, [isMore, children, secondary])
  return (
    <Wrapper className={className}>
      <Text
        ref={textRef}
        isMore={isMore}
        countRow={countRow}
        onClick={onClickText}
        clickable={!!onClickText}
      >
        {children}
      </Text>
      {isExpandButtonVisible &&
        (secondary ? (
          <ExpandButtonSecondary
            size={'small'}
            viewType={'secondary'}
            //@ts-ignore
            ref={buttonRef}
            {...(isMore
              ? {
                  children: 'See less',
                  onClick: lessText,
                }
              : {
                  children: 'See more',
                  onClick: moreText,
                })}
          />
        ) : (
          <ExpandButton
            ref={buttonRef}
            {...(isMore
              ? {
                  children: 'less',
                  onClick: lessText,
                }
              : {
                  children: 'more ',
                  onClick: moreText,
                })}
          />
        ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  font-size: 1.6rem;
`
const Text = styled.div<{
  isMore: boolean
  countRow: number
  clickable: boolean
}>`
  ${({ isMore }) =>
    isMore
      ? ''
      : `
    display: -webkit-box;
  `}
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${({ countRow }) => countRow};
  -webkit-box-orient: vertical;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};

  line-height: 2.4rem;
  color: ${getColorTheme('sun')};
  letter-spacing: -0.05em;
  word-break: break-word;
  white-space: pre-line;
`
const ExpandButton = styled(NormalizedButton)`
  margin-top: 0.8rem;

  line-height: 2.4rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('mercury')};
`
const ExpandButtonSecondary = styled(Button)`
  margin-top: 1.6rem;
`
