import { forwardRef } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { ChevronIcon as ChevronIconBase } from '@/images'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

type Props = {
  className?: string
}

export const SubscriptionBanner = forwardRef<HTMLDivElement, Props>(
  ({ className }, ref) => {
    const router = useRouter()
    const { data } = useQuery(QUERY_GET_USER_PROFILE)

    const currentPlanName =
      data?.getUserProfile?.subscriptionPlan.toLowerCase() || ''
    const currentPlanTitle =
      currentPlanName.slice(0, 1).toUpperCase() + currentPlanName.slice(1)

    return (
      <Container
        ref={ref}
        className={className}
        onClick={() => {
          router.push(ROUTES.relocationManager.calcUrl({ toPlans: true }))
        }}
      >
        Your plan: {currentPlanTitle}. Upgrade to get more services
        <ChevronWrapper>
          <ChevronIcon direction={'right'} />
        </ChevronWrapper>
      </Container>
    )
  },
)

const Container = styled.div`
  position: relative;

  width: 100%;
  padding: 0.8rem 3.4rem 0.8rem 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${getColorTheme('sun')};
  cursor: pointer;

  color: ${getColorTheme('earth')};
  text-align: center;
`
const ChevronWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 0.8rem;

  transform: translateY(-50%);
`
const ChevronIcon = styled(ChevronIconBase)`
  fill: ${getColorTheme('iconAltSecondary')};
`
