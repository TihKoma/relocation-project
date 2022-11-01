import { FC, useEffect, useRef } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { DoneAlternativeIcon } from '@/images'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

type Props = {
  isVisible: boolean
  onClose: () => void
  text: string
}
export const Toast: FC<Props> = ({ isVisible, text, onClose }) => {
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isVisible) {
      timerId.current = setTimeout(onClose, 4000)
    }
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current)
      }
    }
  }, [isVisible, onClose])

  return (
    <Container isVisible={isVisible}>
      <DoneAlternativeIcon />
      <Text>{text}</Text>
      <Link
        href={ROUTES.launchRelocation.calcUrl({
          from: 'area',
        })}
        passHref
      >
        <ButtonWrapper>
          <Button size={'small'} backgroundUnderButton={'alt'} fullWidth>
            Go to relocation project
          </Button>
        </ButtonWrapper>
      </Link>
    </Container>
  )
}

const Container = styled.div<{ isVisible: boolean }>`
  width: 100%;
  max-width: calc(100vw - 1.6rem);
  padding: 1.6rem;

  position: fixed;
  bottom: 0.8rem;
  left: 0.8rem;

  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1.2rem;

  border-radius: 1.6rem;
  background-color: ${getColorTheme('neptune')};
  z-index: 99;

  ${(props) => {
    if (!props.isVisible) {
      return 'transform: translateY(20rem);'
    }
  }}
  transition: transform 0.225s;
`
const Text = styled.div`
  color: ${getColorTheme('earth')};
`
const ButtonWrapper = styled.a`
  grid-column: 1 / 3;
`
