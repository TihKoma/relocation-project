import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { Layout } from '@/components/shared/layout'
import { WhereQuizPreviewMap } from '@/components/shared/maps/WhereQuizPreviewMap'
import { MetaTags } from '@/components/shared/MetaTags'
import { DescriptionHowWorkWhere as DescriptionHowWorkWhereBase } from '@/components/shared/where/DescriptionHowWorkWhere'
import { useAuthorizationStore } from '@/modules/authorization'
import { useIsMobileDevice } from '@/modules/device'
import { NEW_YORK_CENTER } from '@/modules/mock'
import { QUERY_QUIZZES } from '@/modules/quiz'
import {
  WHERE_DESCRIPTION,
  WHERE_META_KEYWORDS,
  WHERE_TITLE,
} from '@/modules/router/seo'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Barker as BarkerBase } from './Barker'
import { Card as CardBase } from './Card'
import { Placeholder } from './Placeholder'

export const History = () => {
  const { data: { userCalculatedQuizzes: quizes } = {}, loading } =
    useQuery(QUERY_QUIZZES)
  const [{ isLoggedIn }] = useAuthorizationStore()
  const isMobile = useIsMobileDevice()

  if (loading) {
    return (
      <Layout isMobileHeaderHidden>
        <div />
      </Layout>
    )
  }

  if (!quizes || quizes.length === 0 || !isLoggedIn) {
    return <Placeholder />
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onCardEnter = (quizId: string) => {}

  const onCardLeave = () => {}

  const title = 'Where'
  return (
    <>
      <MetaTags
        title={WHERE_TITLE}
        description={WHERE_DESCRIPTION}
        keywords={WHERE_META_KEYWORDS}
      />
      <AreaLayout
        isHideMobileSubHeader
        map={!isMobile ? () => <Map initialCenter={NEW_YORK_CENTER} /> : null}
        theme={'dark'}
        subHeaderTitle={title}
      >
        <Container>
          {isMobile && <TitleMobile>{title}</TitleMobile>}
          <Barker />
          <DescriptionHowWorkWhere />
          <SubTitle>Previous quiz results</SubTitle>
          {quizes.map((quiz) => (
            <Card
              key={quiz.id}
              quiz={quiz}
              onEnter={onCardEnter}
              onLeave={onCardLeave}
            />
          ))}
        </Container>
      </AreaLayout>
    </>
  )
}
const Container = styled.div`
  padding: 2.4rem 1.6rem;
  height: 100%;

  overflow-y: auto;

  ${notMobileMedia} {
    border-radius: 16px;
  }
`
const SubTitle = styled.div`
  margin-bottom: 16px;

  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};

  ${mobileMedia} {
    font-size: 24px;
    line-height: 30px;
  }
`
const Map = styled(WhereQuizPreviewMap)`
  width: 100%;
  height: 100%;
`
const Barker = styled(BarkerBase)`
  margin-bottom: 1.6rem;
`
const Card = styled(CardBase)`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`
const DescriptionHowWorkWhere = styled(DescriptionHowWorkWhereBase)`
  margin-bottom: 2.4rem;
`
const TitleMobile = styled.div`
  margin-bottom: 1.6rem;

  font-weight: 500;
  font-size: 2.8rem;
  line-height: 3.6rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};
`
