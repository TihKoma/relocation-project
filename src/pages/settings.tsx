import { FC } from 'react'
import { GetServerSideProps } from 'next'
import styled from '@emotion/styled'

import { createCookieServer, useCookieController } from '@/modules/cookie'
import { Features, useFeatureToggle } from '@/modules/feature-toggle'

const Settings = () => {
  return (
    <Container>
      <FeatureCheckbox feature={'example'} />
    </Container>
  )
}

export default Settings

type Props = {
  feature: Features
}
const FeatureCheckbox: FC<Props> = ({ feature }) => {
  const isSomeFeature = useFeatureToggle(feature)
  const cookie = useCookieController()
  return (
    <label>
      <input
        type={'checkbox'}
        checked={isSomeFeature}
        onChange={(event) => {
          cookie.set(
            `feature-toggle-${feature}`,
            event.target.checked.toString(),
          )
        }}
      />
      {feature}
    </label>
  )
}
const Container = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;

  & label {
    margin-bottom: 1rem;

    display: flex;
    align-items: center;

    input {
      margin-right: 1rem;
    }
  }
`

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const { cookie } = createCookieServer({ req, res })
  const isUserTeamRole = cookie.get()['user_segment_filter'] === 'team'
  if (!isUserTeamRole) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return { props: {} }
}
