import { VFC } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { Controller } from 'react-hook-form'

import { StepRegionGroups } from '@/modules/quiz'
import { mobileMedia } from '@/styles/media'

import { FieldRegions } from './Regions'

type Props = {
  step: StepRegionGroups
}

export const DesiredLocationForm: VFC<Props> = ({ step: { id } }) => {
  const router = useRouter()
  const isResult = router.pathname.includes('where/result')
  return (
    <>
      {!isResult && <Title>You can add up to four areas</Title>}
      <SubTitle>At the moment Where only covers United States</SubTitle>
      <Controller name={id} render={(input) => <FieldRegions {...input} />} />
    </>
  )
}

const Title = styled.div`
  margin-bottom: 1.2rem;

  font-weight: 500;
  font-size: 2.8rem;
  line-height: 3.6rem;
  ${mobileMedia} {
    font-size: 2rem;
    line-height: 2.4rem;
  }
  letter-spacing: -0.04em;
  color: #12151f;
`

const SubTitle = styled.div`
  margin-bottom: 2.4rem;

  font-size: 1.8rem;
  line-height: 2.4rem;
  ${mobileMedia} {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
  letter-spacing: -0.04em;
  color: #12151f;
`
