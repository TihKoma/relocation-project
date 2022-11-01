import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { CheckmarkIcon } from '@/images'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

export const PayWall = () => {
  return (
    <Container>
      <Title>Get your job done with Nicity checklist</Title>
      <Description>
        Checklists tailored to your needs to help you with every step of the
        move
      </Description>
      <a
        href={ROUTES.payment.calcUrl({
          withPaymentEvent: true,
        })}
      >
        <ButtonStartTrial size={'small'} fullWidth>
          Start your free trial
        </ButtonStartTrial>
      </a>
      <TasksWrapper>
        <TasksList>
          <Task>
            <CheckBoxActive>
              <CheckmarkIcon />
            </CheckBoxActive>
            <TaskContent>
              <TaskTitle>Get a mortgage</TaskTitle>
              <Button size={'small'} viewType={'tertiary'} disabled>
                See options
              </Button>
            </TaskContent>
          </Task>
          <Task>
            <Checkbox />
            <TaskTitle>Do home inspection</TaskTitle>
          </Task>
          <Task>
            <Checkbox />
            <TaskTitle>Find a house</TaskTitle>
          </Task>
        </TasksList>
      </TasksWrapper>
      <Gradient />
    </Container>
  )
}

const Container = styled.div`
  width: calc(100% - 3.2rem);
  margin: 0 auto 2.4rem auto;
  padding: 1.6rem 1.6rem 0 1.6rem;

  position: relative;

  border-radius: 2.4rem;
  background-color: #eae8ff;
  color: ${getColorTheme('textDefaultPrimary')};
  overflow: hidden;
`
const Title = styled.div`
  margin-bottom: 0.8rem;

  font-size: 2.8rem;
  line-height: 3.6rem;
  font-weight: 500;
`
const Description = styled.div`
  margin-bottom: 1.6rem;

  line-height: 2.4rem;
`
const ButtonStartTrial = styled(Button)`
  margin-bottom: 2.4rem;
`
const TasksWrapper = styled.div`
  height: 20.6rem;
  width: 100%;

  position: relative;
`
const TasksList = styled.div`
  width: 100%;
  position: absolute;
  padding: 1.33rem;

  display: grid;
  grid-auto-flow: row;
  gap: 0.663rem;

  border-radius: 2.4rem;
  background: ${getColorTheme('backgroundDefaultPrimary')};
`
const Task = styled.div`
  width: 100%;
  padding: 1.33rem;

  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: 1.33rem;

  border-radius: 1.33rem;
  box-shadow: 0px 1.65867px 6.63467px rgba(18, 21, 31, 0.04),
    0px 4.976px 19.904px rgba(18, 21, 31, 0.1);
  border: 0.08rem solid ${getColorTheme('sun200')};
`
const TaskContent = styled.div`
  width: 100%;

  display: grid;
  grid-auto-flow: row;
  align-items: start;
  gap: 0.989rem;
`
const TaskTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`
const Checkbox = styled.div`
  width: 1.99rem;
  height: 1.99rem;

  border: 0.2rem solid ${getColorTheme('sun200')};
  border-radius: 0.6rem;
`
const CheckBoxActive = styled(Checkbox)`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: ${getColorTheme('neptune600')};
`
const Gradient = styled.div`
  width: calc(100% - 3.2rem);
  height: 2.8rem;
  margin: 0 auto;

  position: absolute;
  bottom: 0;

  background: linear-gradient(
    0,
    rgba(18, 21, 31, 0.04) 0%,
    rgba(18, 21, 31, 0) 100%
  );
`
