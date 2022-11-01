import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styled from '@emotion/styled'

import {
  HEIGHT_MOBILE_HEADER,
  Layout,
  NAVIGATION_BAR_HEIGHT,
} from '@/components/shared/layout'
import { Button } from '@/components/ui-kit/Button'
import { quizHistoryPlaceholder, quizHistoryPlaceholderMobile } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { useIsNotMobileDevice } from '@/modules/device'
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_PAGE_DESCRIPTION,
  DEFAULT_PAGE_TITLE,
  ROUTES,
} from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export const Placeholder = () => {
  const analytics = useAnalytics()
  const isNotMobile = useIsNotMobileDevice()
  return (
    <>
      <Head>
        <title>{DEFAULT_PAGE_TITLE}</title>
        <meta name={'description'} content={DEFAULT_PAGE_DESCRIPTION} />
        <meta property={'og:image'} content={DEFAULT_OG_IMAGE} />
      </Head>
      <Layout>
        <Container>
          <Wrapper>
            <Content>
              <Title>Where</Title>
              <SubTitle>
                Find the ideal location for your next move. Take our AI-backed
                quiz and get neighborhood recommendations based on your budget
                and lifestyle
              </SubTitle>
              <Link href={ROUTES.whereQuiz.calcUrl()} passHref shallow>
                <LinkQuiz
                  viewType={'primary'}
                  backgroundUnderButton={'alt'}
                  size={isNotMobile ? 'large' : 'medium'}
                  as={'a'}
                  onClick={() => {
                    analytics?.newQuizStart({ source: 'starting_page' })
                  }}
                >
                  Take the quiz
                </LinkQuiz>
              </Link>
            </Content>
            {isNotMobile ? (
              <WrapperImg>
                <Image
                  height={628}
                  width={712}
                  layout={'intrinsic'}
                  src={quizHistoryPlaceholder.src}
                />
              </WrapperImg>
            ) : (
              <ImgMobile src={quizHistoryPlaceholderMobile.src} />
            )}
          </Wrapper>
        </Container>
      </Layout>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-grow: 1;

  background: linear-gradient(180deg, #3f37c9 0%, #5d54e6 100%);

  ${notMobileMedia} {
    margin: 0 -2.4rem -2.4rem;
    padding-left: 5rem;

    overflow: hidden;
  }
  ${mobileMedia} {
    padding-top: calc(3.9rem + ${HEIGHT_MOBILE_HEADER}px);
    padding-bottom: ${NAVIGATION_BAR_HEIGHT}px;
  }
`
const Title = styled.div`
  margin-bottom: 2.4rem;

  font-weight: 500;
  font-size: 62px;
  line-height: 72px;
  letter-spacing: -0.04em;
  color: ${getColorTheme('earth')};

  ${mobileMedia} {
    margin-bottom: 1.2rem;

    font-size: 28px;
    line-height: 36px;
  }
`
const SubTitle = styled.div`
  margin-bottom: 4.4rem;

  font-size: 18px;
  line-height: 24px;
  color: ${getColorTheme('earth')};

  ${mobileMedia} {
    margin-bottom: 2rem;

    font-size: 16px;
    line-height: 24px;
  }
`
const WrapperImg = styled.div`
  margin-left: auto;
  margin-right: -5rem;
`
const ImgMobile = styled.img`
  width: 100%;
  margin: auto auto 0;
`
const Content = styled.div`
  max-width: 46rem;
  padding: 0 1.6rem;

  flex-shrink: 0;

  ${mobileMedia} {
    margin-bottom: 4.8rem;
  }
`
const Wrapper = styled.div`
  max-width: 139.8rem;
  margin: 0 auto;

  display: flex;

  ${notMobileMedia} {
    align-items: center;
    flex-grow: 1;
  }
  ${mobileMedia} {
    flex-direction: column;
  }
`
const LinkQuiz = styled(Button)`
  ${notMobileMedia} {
    max-width: 33rem;
    width: 100%;
  }
`
