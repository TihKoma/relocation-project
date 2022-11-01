import { VFC } from 'react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { ArrowDownIcon } from '@/images'
import { CountryCode } from '@/modules/authorization'
import { getColorTheme } from '@/styles/themes'

import { flags } from './flags'

type Props = {
  countryCode: CountryCode | null
  onClick: () => void
  className?: string
  disabled?: boolean
  loading?: boolean
}
export const CountryCodeButton: VFC<Props> = ({
  countryCode,
  className,
  onClick,
  disabled,
  loading,
}) => {
  const flagImage = countryCode
    ? flags[`${countryCode.short.toLowerCase()}.png`]
    : null

  return (
    <Container className={className} onClick={onClick} disabled={disabled}>
      {loading ? (
        <Loader />
      ) : flagImage ? (
        <Image src={flagImage} alt={'flag'} width={'24'} />
      ) : (
        <Placeholder />
      )}
      <ArrowDownIcon />
    </Container>
  )
}

const Container = styled(NormalizedButton)`
  height: 2.4rem;

  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 0.4rem;

  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`
const Image = styled.img`
  border-radius: 20%;
`
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const Loader = styled.div`
  width: 2.4rem;
  height: 2.4rem;

  border-color: ${getColorTheme('moon')} ${getColorTheme('moon')} transparent;
  border-radius: 50%;
  border-style: solid;
  border-width: 3px;

  animation: ${rotateAnimation} 1.5s linear infinite;
`
const Placeholder = styled.div`
  width: 2.4rem;
  height: 2.4rem;
`
