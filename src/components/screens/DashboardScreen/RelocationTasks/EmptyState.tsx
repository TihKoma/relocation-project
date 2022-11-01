import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { getColorTheme } from '@/styles/themes'

type Props = {
  text: string
  image: ReactNode
  className?: string
  withCreateTaskButton?: boolean
  onCreateNewTask: () => void
}
export const EmptyState: FC<Props> = ({
  className,
  text,
  image,
  withCreateTaskButton,
  onCreateNewTask,
}) => {
  return (
    <Container className={className}>
      <TextWrapper>
        {text}
        {withCreateTaskButton ? (
          <Button onClick={onCreateNewTask} size={'small'}>
            Create new task
          </Button>
        ) : null}
      </TextWrapper>
      <ImageWrapper>{image}</ImageWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 1.6rem;

  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-content: start;
  gap: 1.2rem;

  background: ${getColorTheme('backgroundDefaultSecondary')};
  border-radius: 1.6rem;
`
const ImageWrapper = styled.div`
  width: 4.8rem;
  height: 4.8rem;
`
const TextWrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-content: start;
  gap: 1.2rem;
`
