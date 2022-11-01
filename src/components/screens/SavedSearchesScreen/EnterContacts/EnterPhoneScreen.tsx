import { FC } from 'react'
import { css } from '@emotion/css'
import styled from '@emotion/styled'

import { PhoneRequest } from '@/components/shared/AuthForm/PhoneRequest'
import { Button } from '@/components/ui-kit/Button'
import { CrossIcon } from '@/images'
import { mobileMedia } from '@/styles/media'

export type PhoneForm = {
  session: string
  phone: string
}

type Props = {
  onRequestClose: () => void
  onSubmit: (form: PhoneForm) => void
  onLoggedIn?: () => Promise<void | {
    userId: string
    tags: string | undefined
  }>
}

export const EnterPhoneScreen: FC<Props> = ({
  onRequestClose,
  onSubmit,
  onLoggedIn,
}) => {
  return (
    <>
      <CloseButton
        size={'small'}
        viewType={'ghost'}
        Icon={<CrossIcon />}
        onClick={() => onRequestClose()}
      />
      <Content>
        <PhoneRequest
          phone={''}
          title={'Your Search Has Been Saved!'}
          description={'To see your search list, register or login'}
          buttonText={'Send code'}
          cssSettings={{
            title: TitleCss,
            description: DescriptionCss,
            socials: SocialsCss,
            submitButton: submitButtonCss,
          }}
          isSocialDescriptionVisible={false}
          onComplete={onSubmit}
          onLoggedIn={onLoggedIn}
        />
      </Content>
    </>
  )
}

const Content = styled.div`
  padding: 3rem 6.8rem;

  ${mobileMedia} {
    padding: 3rem 1.6rem;
  }
`
const TitleCss = css`
  margin-bottom: 2.4rem;

  font-size: 4.2rem;
  line-height: 5.2rem;

  ${mobileMedia} {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 2.8rem;
  }
`
const DescriptionCss = css`
  margin-bottom: 2.4rem;

  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
`
const SocialsCss = css`
  margin: 0 auto 2.8rem;
`
const CloseButton = styled(Button)`
  display: flex;

  margin-right: 1rem;
  margin-left: auto;
`
const submitButtonCss = css`
  ${mobileMedia} {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
`
