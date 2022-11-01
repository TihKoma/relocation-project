import { FC, ReactElement, ReactNode } from 'react'
import styled from '@emotion/styled'

type Props = {
  title: string
  description?: string
  icon: ReactElement
  className?: string
  children?: ReactNode
}

export const Plug: FC<Props> = ({
  title,
  className,
  description,
  icon,
  children,
}) => {
  return (
    <Container className={className}>
      {icon}
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {children}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  max-width: 364px;
`

const Title = styled.span`
  display: block;

  margin-top: 16px;
  margin-bottom: 8px;

  color: #000000;
  font-size: 2rem;
  letter-spacing: -0.04rem;
  text-align: center;
`

const Description = styled.p`
  margin-top: 0;
  margin-bottom: 16px;

  color: #9ea9b2;
  text-align: center;
  line-height: 2.4rem;
`
