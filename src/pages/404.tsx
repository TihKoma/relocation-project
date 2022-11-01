import { FC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { Layout } from '@/components/shared/layout'
import { Button as ButtonBase } from '@/components/ui-kit/Button'
import { ReactComponent as Img404 } from '@/images/404.svg'
import { useIsMobileDevice } from '@/modules/device'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { ServerData } from './_app'

const NotFound: FC<ServerData> = () => {
  const isMobile = useIsMobileDevice()
  return (
    <Layout>
      <Container>
        <Img404 />
        <Header>Page not found</Header>
        <Description>
          The page you were looking for was moved or does not exist
        </Description>
        <Link href={'/'}>
          <Button size={isMobile ? 'medium' : 'large'}>
            Let's get you back home
          </Button>
        </Link>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  height: 100%;

  ${mobileMedia} {
    margin-top: 6rem;
  }
`
const Header = styled.div`
  font-weight: 500;
  font-size: 2.8rem;

  line-height: 3.6rem;
  letter-spacing: -0.04em;

  color: ${getColorTheme('sun')};

  ${mobileMedia} {
    font-size: 1.8rem;
  }
`
const Description = styled.div`
  font-weight: 400;
  font-size: 1.2rem;

  line-height: 1.6rem;
  margin-top: 1.6rem;

  color: ${getColorTheme('mercury')};

  ${mobileMedia} {
    margin-top: 0.6rem;
  }
`
const Button = styled(ButtonBase)`
  margin-top: 1.6rem;

  ${mobileMedia} {
    margin-bottom: 5rem;
  }
`

export default NotFound
