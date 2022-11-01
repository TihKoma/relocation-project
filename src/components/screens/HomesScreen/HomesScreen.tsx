import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { SearchInput as SearchInputBase } from '@/components/screens/HomesScreen/SearchInput'
import { AreaLayout } from '@/components/shared/AreaLayout'
import imageSrc from '@/images/marketplace-landing.webp'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { HomesMeta } from './HomesMeta'

export const HomesScreen = () => {
  const router = useRouter()

  const withQuizLink = router.query.withQuiz || false

  return (
    <>
      <HomesMeta />
      <AreaLayout>
        <Container>
          <BackgroundImage src={imageSrc} layout={'fill'} />
          <BackgroundImageOverlay />
          <Content>
            <Title>
              Let’s find your
              <br /> dream home
            </Title>
            <SearchInput />
            {withQuizLink && (
              <Link passHref href={ROUTES.whereQuiz.calcUrl()}>
                <LinkToWhere>I need a location recommendation</LinkToWhere>
              </Link>
            )}
          </Content>
        </Container>
      </AreaLayout>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  position: relative;

  overflow: hidden;
`
const BackgroundImage = styled(Image)`
  width: 100%;
  height: 100%;
  position: absolute;

  object-fit: cover;
  pointer-events: none;
`
const BackgroundImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(22, 28, 48, 0.44);
  pointer-events: none;
`
const Content = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${notMobileMedia} {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
  }

  ${mobileMedia} {
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
`
const Title = styled.h2`
  margin: 0;
  margin-bottom: 2.4rem;

  font-weight: 500;
  font-feature-settings: 'liga' off;
  line-height: 7.2rem;
  color: ${getColorTheme('earth')};
  text-align: center;

  ${notMobileMedia} {
    font-size: 6.2rem;
    letter-spacing: -0.04em;
  }

  ${mobileMedia} {
    font-size: 4.2rem;
  }
`
const LinkToWhere = styled.a`
  cursor: pointer;

  color: ${getColorTheme('earth')};
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  text-decoration: underline;
`
const SearchInput = styled(SearchInputBase)`
  margin-bottom: 4rem;

  ${notMobileMedia} {
    width: 68.4rem;
  }

  ${mobileMedia} {
    width: calc(100% - 3.2rem);
  }
`
