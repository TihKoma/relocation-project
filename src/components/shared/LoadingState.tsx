import { FC, ReactNode, VFC } from 'react'
import styled from '@emotion/styled'

import { Activity } from '@/components/ui-kit/Activity'

type Props = {
  loading?: boolean
  error?: string
  loadingComponent?: ReactNode
  errorComponent?: ReactNode
  children: ReactNode
}
export const LoadingState: FC<Props> = ({
  error,
  errorComponent,
  loading,
  loadingComponent,
  children,
}) => {
  if (error) {
    if (errorComponent) {
      return <>{errorComponent}</>
    }
    return <DefaultErrorComponent>{error}</DefaultErrorComponent>
  }
  if (loading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>
    }
    return <DefaultLoadingComponent />
  }
  return <>{children}</>
}

const DefaultLoadingComponent: VFC = () => {
  return (
    <Container>
      <Activity />
    </Container>
  )
}

type ErrorProps = {
  children: ReactNode
}
const DefaultErrorComponent: FC<ErrorProps> = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
