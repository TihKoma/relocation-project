import { FC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import DownloadAppButton from '@/images/download-app-button.png'
import { getColorTheme } from '@/styles/themes'

type Props = {
  className?: string
}
export const DownloadAppBanner: FC<Props> = ({ className }) => {
  return (
    <Container className={className}>
      <Title>The best of Nicity is in the app</Title>
      <Link href={'https://apps.apple.com/us/app/nicity/id1599096002'}>
        <a target={'_blank'}>
          <Image src={DownloadAppButton.src} />
        </a>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
  margin-bottom: 1.6rem;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultSecondary')};
`
const Image = styled.img`
  width: 16rem;

  cursor: pointer;
`
