import { VFC } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { SharingBanner } from '@/components/screens/where/Result/SharingBanner/SharingBanner'
import { useSharingVisibility } from '@/components/screens/where/Result/SharingBanner/use-sharing-visibility'
import { ROUTES } from '@/modules/router'
import { API_HOST } from '@/modules/utils/config'

export const Sharing: VFC = () => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''
  const quizResultUrl = `${API_HOST}${ROUTES.where.calcUrl()}`

  const { sharingRef, isSharingVisible, hideSharingForSession, hideSharing } =
    useSharingVisibility(id)

  return (
    <SharingWrapper ref={sharingRef} isActive={isSharingVisible}>
      {isSharingVisible && (
        <SharingBanner
          title={'Do you like your experience?'}
          subtitle={'Tell your friends about Where'}
          quizResultUrl={quizResultUrl}
          hideForSession={hideSharingForSession}
          onShare={hideSharing}
        />
      )}
    </SharingWrapper>
  )
}

const SharingWrapper = styled.div<{ isActive: boolean }>`
  max-height: ${(props) => (props.isActive ? '100%' : '0')};
  margin: ${(props) => (props.isActive ? '1.6rem 0' : '0')};

  opacity: ${(props) => (props.isActive ? '1' : '0')};

  transition: all 0.8s ease;
`
