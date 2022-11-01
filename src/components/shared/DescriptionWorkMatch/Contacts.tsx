import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { PlanetIcon as PlanetIconBase } from '@/images/description-work-match'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import {
  Paragraph as ParagraphBase,
  Title as TitleBase,
  Wrapper as WrapperBase,
} from './shared'

export const Contacts = () => {
  return (
    <Container>
      <Wrapper>
        <Title>
          Get
          <br /> in touch
        </Title>
        <Paragraph>
          The Nicity team of researches housing experts is working every day to
          improve the Where engine with better and more diverse sources of
          reliable data to present the most accurate picture possible and to
          provide better recommendations. We welcome your feedback. Please don’t
          hesitate to use the form to tell us about your experience.
        </Paragraph>
        <ButtonContact
          viewType={'primary'}
          size={'large'}
          as={'a'}
          // @ts-ignore
          target={'_blank'}
          // @ts-ignore
          href={'mailto:support@nicity.com'}
        >
          Contact
        </ButtonContact>
        <PlanetIcon />
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 96px;
  padding-bottom: 106px;

  background: linear-gradient(
    -0.0292124667rad,
    ${getColorTheme('hydra')} calc(100% - 32px),
    transparent calc(100% - 32px)
  );

  ${mobileMedia} {
    padding-top: 72px;
    padding-bottom: 64px;
  }
`
const Wrapper = styled(WrapperBase)`
  width: 100%;

  display: grid;
  grid-template-columns: 50% minmax(0, 290px);
  justify-content: space-between;
  grid-column-gap: 10px;

  ${mobileMedia} {
    grid-template-columns: 1fr 1fr;
  }
`

const ButtonContact = styled(Button)`
  ${notMobileMedia} {
    justify-self: start;
  }
  ${mobileMedia} {
    grid-column: 2 span;
  }
`
const Title = styled(TitleBase)`
  margin-bottom: 24px;

  ${mobileMedia} {
    margin-bottom: 16px;
  }
  ${notMobileMedia} {
    br {
      display: none;
    }
  }
`
const Paragraph = styled(ParagraphBase)`
  margin-bottom: 40px;

  ${mobileMedia} {
    margin-bottom: 32px;

    grid-column: 2 span;
  }
`
const PlanetIcon = styled(PlanetIconBase)`
  grid-column: 2 / 3;

  ${notMobileMedia} {
    width: 100%;

    grid-row: 1 / 3 span;
  }
  ${mobileMedia} {
    height: 120px;
    margin-bottom: 8px;

    grid-row: 1;
    justify-self: end;
  }
`
