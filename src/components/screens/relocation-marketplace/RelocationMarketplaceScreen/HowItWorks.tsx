import { FC } from 'react'
import styled from '@emotion/styled'

import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { SectionTitle as SectionTitleBase } from './shared'

const items: { title: string; subtitle: string; step: number }[] = [
  {
    step: 1,
    title: 'Tell us about your relocation needs',
    subtitle:
      'We provide relocation services to fit any needs, from legal assistance, packing, and moving to finding community in the new area',
  },
  {
    step: 2,
    title: 'Get matched with pros you can trust',
    subtitle:
      'Ask for instant quotes from local experts, no matter what moving help you need. Nicity knows how to make your relocation stress-free',
  },
  {
    step: 3,
    title: 'Move with comfort',
    subtitle:
      'Stressed about finding a job or clueless about buying new furniture? Our team will iron out the details while you settle in and put your feet up',
  },
]
type Props = {
  className?: string
}
export const HowItWorks: FC<Props> = ({ className }) => {
  return (
    <Container className={className}>
      <SectionTitle>How it works</SectionTitle>
      <Steps>
        {items.map((item) => (
          <Step key={item.step}>
            <StepNumber>{item.step}</StepNumber>
            <StepContent>
              <StepTitle>{item.title}</StepTitle>
              <StepSubtitle>{item.subtitle}</StepSubtitle>
            </StepContent>
          </Step>
        ))}
      </Steps>
    </Container>
  )
}

const Container = styled.div`
  ${notMobileMedia} {
    margin: auto;
    max-width: 144rem;
    padding: 0 9.7rem;
  }

  ${mobileMedia} {
    padding: 0 1.6rem;
  }
`
const SectionTitle = styled(SectionTitleBase)`
  ${notMobileMedia} {
    margin-bottom: 3.6rem;

    font-size: 4.2rem;
    text-align: center;
    line-height: 5.2rem;
  }

  ${mobileMedia} {
    margin-bottom: 2.4rem;
  }
`
const Steps = styled.ul`
  display: grid;

  list-style-type: none;
  padding: 0;
  margin: 0;

  ${notMobileMedia} {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 4rem;
  }

  ${mobileMedia} {
    row-gap: 3.2rem;
  }
`

const Step = styled.li`
  display: flex;

  ${notMobileMedia} {
    flex-direction: column;
    align-items: center;
  }
`
const StepContent = styled.div``
const StepTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};

  ${notMobileMedia} {
    margin-bottom: 0.8rem;

    font-size: 2.2rem;
    line-height: 2.8rem;
    text-align: center;
  }

  ${mobileMedia} {
    margin-bottom: 0.4rem;

    font-size: 1.6rem;
    line-height: 2.4rem;
  }
`

const StepSubtitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultSecondary')};

  ${notMobileMedia} {
    font-size: 1.8rem;
    line-height: 2.4rem;
    text-align: center;
  }

  ${mobileMedia} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`

const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 0.2rem solid ${getColorTheme('strokeAccentSecondary')};
  border-radius: 10rem;

  font-style: normal;
  font-weight: 500;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textAccentPrimary')};

  ${notMobileMedia} {
    width: 5.6rem;
    height: 5.6rem;
    margin-bottom: 2rem;

    font-size: 2.4rem;
    line-height: 2.8rem;
  }

  ${mobileMedia} {
    min-width: 4.4rem;
    height: 4.4rem;
    margin-right: 1.2rem;

    font-size: 1.8rem;
    line-height: 2.4rem;
  }
`
