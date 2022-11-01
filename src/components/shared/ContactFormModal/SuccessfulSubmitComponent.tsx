import { FC, MutableRefObject } from 'react'
import { useRouter } from 'next/router'
import { ViewTimeEntityType } from '__generated__/globalTypes'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { PlaceholderSuccessfulApplication } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { MUTATION_ADD_VIEW_TIMES_WITH_COUNT } from '@/modules/map/graphql/mutation-add-view-times-with-count'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  internalId: string
  displayStartTime: MutableRefObject<number>
}

export const SuccessfulSubmitComponent: FC<Props> = ({
  internalId,
  displayStartTime,
}) => {
  const router = useRouter()
  const regionSlug = router.query.regionSlug as string
  const analytics = useAnalytics()
  const [addViewTimes] = useMutation(MUTATION_ADD_VIEW_TIMES_WITH_COUNT)

  const handleGoBack = () => {
    analytics.MPContactAgentContinueSearchClick()
    const isNewPage = window.history.state.idx === 0

    if (displayStartTime.current) {
      const currentTime = new Date().getTime()
      addViewTimes({
        variables: {
          input: [
            {
              entityID: internalId,
              entityType: ViewTimeEntityType.LISTING_CONTACT_AGENT,
              duration: currentTime - displayStartTime.current,
            },
          ],
        },
      })
    }

    if (isNewPage) {
      router.push(ROUTES.areaRealEstate.calcUrl({ regionSlug }))
    } else {
      router.back()
    }
  }

  return (
    <Container>
      <Illustration />
      <Title>Thank you for your submission!</Title>
      <Text>
        You will be contacted shortly
        <br />
        to be connected with a local real
        <br />
        estate expert
      </Text>
      <ActionButton viewType={'primary'} onClick={handleGoBack}>
        Continue to search
      </ActionButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 516px;

  padding: 2.4rem;

  border-radius: 32px;
  background-color: ${getColorTheme('earth')};

  ${mobileMedia} {
    padding: 2.4rem;
    height: 100%;

    justify-content: center;

    border-radius: 24px;
  }
`

const Illustration = styled(PlaceholderSuccessfulApplication)`
  width: 10.8rem;
  height: 10.8rem;
  margin-bottom: 1.6rem;
`

const Title = styled.span`
  margin-bottom: 0.8rem;

  color: ${getColorTheme('sun')};
  font-size: 2rem;
  line-height: 2.4rem;
  text-align: center;

  ${mobileMedia} {
    font-size: 2rem;
    line-height: 2.4rem;
  }
`

const Text = styled.span`
  margin-bottom: 1.6rem;

  color: ${getColorTheme('mercury')};
  font-size: 1.6rem;
  line-height: 2.4rem;
  text-align: center;
`

const ActionButton = styled(Button)`
  width: 100%;
`
