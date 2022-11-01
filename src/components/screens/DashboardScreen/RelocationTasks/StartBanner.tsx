import { FC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { StartBannerImage as StartBannerImageBase } from '@/images'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

type Props = {
  className?: string
}
export const StartBanner: FC<Props> = ({ className }) => {
  return (
    <Container className={className}>
      <Content>
        <Text>
          <Title>Set the tasks for your to-do list</Title>
          <Description>
            Take the quiz to create a personalized checklist for your move
          </Description>
        </Text>
        <StartBannerImage />
      </Content>
      <Link href={ROUTES.relocationQuiz.calcUrl()} passHref>
        <a>
          <Button viewType={'primary'} size={'small'} fullWidth>
            Get the checklist
          </Button>
        </a>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  padding: 1.6rem;

  border-radius: 1.6rem;
  border: 1px solid ${getColorTheme('backgroundDefaultTertiary')};
  box-shadow: 0px 2px 8px rgba(18, 21, 31, 0.04),
    0px 6px 24px rgba(18, 21, 31, 0.1);
`
const Content = styled.div`
  margin-bottom: 1.6rem;

  display: flex;
  justify-content: space-between;
`
const Text = styled.div`
  margin-right: 2.3rem;

  flex-grow: 1;
`
const Title = styled.div`
  margin-bottom: 0.8rem;
  max-width: 20rem;

  font-style: normal;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`
const Description = styled.div`
  max-width: 20rem;

  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`
const StartBannerImage = styled(StartBannerImageBase)`
  min-width: 8.2rem;
`
