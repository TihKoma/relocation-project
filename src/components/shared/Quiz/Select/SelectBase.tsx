import { VFC } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { StepSelect } from '@/modules/quiz'
import { fullHDMedia, mobileMedia, notDesktopMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Value = Array<StepSelect['payload']['options'][number]['value']>
type Props = {
  value: Value
  options: StepSelect['payload']['options']
  subtitle?: string | undefined
  onChange: (ids: Value) => void
}
export const SelectBase: VFC<Props> = ({ value, onChange, options }) => {
  const router = useRouter()
  const isResult = router.pathname.includes('where/result')
  return (
    <SelectWrapper>
      <Container>
        {options.map((option) => {
          const isActive = value.includes(option.value)
          return (
            <TileWrapper key={option.value} isResult={isResult}>
              <Tile
                isActive={isActive}
                onClick={() => {
                  if (isActive) {
                    onChange(value.filter((id) => id !== option.value))
                  } else {
                    onChange([...value, option.value])
                  }
                }}
              >
                <Icon src={option.image} />
                <>{option.title}</>
              </Tile>
            </TileWrapper>
          )
        })}
      </Container>
    </SelectWrapper>
  )
}

const SelectWrapper = styled.div``

const Container = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: 1fr 1fr;

  font-size: 2rem;
  line-height: 2.4rem;
  text-align: center;
  letter-spacing: -0.04em;
  color: #12151f;

  ${mobileMedia} {
    gap: 1.6rem;

    font-size: 1.6rem;
    line-height: 2.2rem;
  }
`
const hoverStyle = `
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 3.78px 33.4221px rgba(0, 0, 0, 0.06);
`

const TileWrapper = styled.div<{ isResult: boolean }>`
  padding-top: ${({ isResult }) => (isResult ? '56%' : '76%')};

  ${notDesktopMedia} {
    padding-top: 70%;
  }

  ${fullHDMedia} {
    padding-top: 67%;
  }

  ${mobileMedia} {
    padding-top: ${({ isResult }) => (isResult ? '96%' : '88%')};
  }

  position: relative;
`
const Tile = styled(NormalizedButton)<{ isActive: boolean }>`
  padding: 3rem 1.6rem;

  display: flex;
  align-items: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  flex-direction: column;
  justify-content: center;

  background: #ffffff;
  border: ${(props) =>
    props.isActive
      ? `0.2rem solid ${getColorTheme('neptune600')(props)}`
      : `2px solid ${getColorTheme('milkyway')(props)}`};
  border-radius: 1.2rem;

  transition: 225ms;

  font-size: 2rem;
  line-height: 2.4rem;
  font-weight: 500;

  ${notDesktopMedia} {
    padding: 1.4rem;
  }

  ${mobileMedia} {
    padding: 2rem 1.4rem;
    font-size: 1.6rem;
    line-height: 2.2rem;
  }

  &:hover {
    ${hoverStyle}
  }

  ${(props) =>
    props.isActive
      ? `
    img {
      filter: brightness(0) saturate(100%) invert(16%) sepia(78%) saturate(4730%) hue-rotate(245deg) brightness(83%) contrast(89%);
    }
    color: ${getColorTheme('neptune600')(props)};`
      : ''}
`
const Icon = styled.img`
  width: 6.4rem;
  height: 6.4rem;
  margin-bottom: 2rem;

  ${mobileMedia} {
    width: 4.8rem;
    height: 4.8rem;
    margin-bottom: 1.4rem;
  }
`
