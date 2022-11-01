import { VFC } from 'react'
import styled from '@emotion/styled'
import { Controller } from 'react-hook-form'

import { StepLocations } from '@/modules/quiz'
import { mobileMedia } from '@/styles/media'

import { FieldAddresses } from './Addresses'

type Props = {
  step: StepLocations
}
export const Landmark: VFC<Props> = ({ step: { id, result } }) => {
  return (
    <>
      <Title>Add a landmark or address</Title>
      <SubTitle>
        It could be your place of work, your parent's house, or your favorite
        coffee shop. At the moment Where only covers United States.
      </SubTitle>
      <Controller
        name={id}
        render={(input) => <FieldAddresses {...input} stepResult={result} />}
      />
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
