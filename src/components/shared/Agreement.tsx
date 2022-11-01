import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

export const Agreement = () => {
  return (
    <Container>
      <Text style={{ marginBottom: '.8rem' }}>
        By signing up, you agree to our{' '}
        <PolicyLink
          href={'https://about.nicity.com/legal/privacy_policy'}
          target={'_blank'}
        >
          Privacy Policy
        </PolicyLink>
        ,&nbsp;
        <PolicyLink
          href={'https://about.nicity.com/legal/cookie_policy'}
          target={'_blank'}
        >
          Cookie Policy
        </PolicyLink>
        ,&nbsp;
        <PolicyLink
          href={'https://about.nicity.com/legal/member_agreement'}
          target={'_blank'}
        >
          Member Agreement
        </PolicyLink>
      </Text>
      <Text>
        This site is protected by reCAPTCHA and the Google
        <br />
        <PolicyLink
          href={'https://policies.google.com/privacy'}
          target={'_blank'}
        >
          Privacy Policy
        </PolicyLink>
        &nbsp;and&nbsp;
        <PolicyLink
          href={'https://policies.google.com/terms'}
          target={'_blank'}
        >
          Terms of Service
        </PolicyLink>
        &nbsp; apply
      </Text>
    </Container>
  )
}

const Container = styled.div``
const Text = styled.p`
  margin: 0 auto;
  max-width: 38rem;

  color: ${getColorTheme('mercury')};
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  font-weight: 400;
`

const PolicyLink = styled.a`
  color: ${getColorTheme('pluto')};
  cursor: pointer;
`
