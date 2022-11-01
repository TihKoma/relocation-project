import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

import { InfoIcon, TooltipArrow as TooltipArrowBase } from '@/images'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  onClick?: () => void
  onClose?: (value: false) => void
  type: 'info' | 'warning'
  className?: string
  children: ReactNode
}

export const Banner: FC<Props> = ({ className, type, children, onClick }) => {
  return (
    <Wrapper type={type}>
      <Container className={className} type={type} onClick={onClick}>
        {type === 'info' ? <InfoIcon /> : <TooltipArrow />}
        <Text type={type}>{children}</Text>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div<Pick<Props, 'type'>>`
  ${notMobileMedia} {
    margin: 0 -1.6rem;
  }

  padding: 0 1.6rem;

  background: ${getColorTheme('sun50')};

  ${mobileMedia} {
    ${(props) =>
      props.type === 'info'
        ? `
        margin: 0 -1.6rem -1.6rem;
        padding: 1.6rem;
        
        border-radius: 2.4rem 2.4rem 0 0;`
        : `
        margin: 0 -1.6rem 1.6rem;
        
        background: ${getColorTheme('earth')(props)};`}
  }
`

const Container = styled.div<Pick<Props, 'type'>>`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  transition: 225ms;

  ${(props) => {
    switch (props.type) {
      case 'info':
        return `
        border-color: ${getColorTheme('pluto')(props)};
        
        font-weight: 500;
        color: ${getColorTheme('neptune600')(props)};
  
        &:hover {
          background: ${getColorTheme('hydra')(props)};
          cursor: default;
        }
      `
      case 'warning':
        return `
        padding: 1.2rem;
        
        position: relative;
        
        color: ${getColorTheme('earth')(props)};
        
        background: ${getColorTheme('saturn')(props)};
        border-radius: 1.6rem;
      `
      default:
        return ''
    }
  }}

  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.04em;
`

const Text = styled.span<Pick<Props, 'type'>>`
  ${(props) =>
    props.type === 'info'
      ? `border-bottom: 1px solid ${getColorTheme('neptune600')(props)}`
      : ''}
`
const TooltipArrow = styled(TooltipArrowBase)`
  position: absolute;
  top: -1rem;
  left: 1.6rem;
`
