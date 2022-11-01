import { VFC } from 'react'
import styled from '@emotion/styled'

import { ActionButton } from '@/components/shared/feed/FeedContent/Footer/ActionButton'
import { ShareDropdown } from '@/components/shared/ShareDropdown'
import { ShareIcon as ShareIconBase } from '@/images/postActions'
import { ROUTES } from '@/modules/router'

type Props = {
  postSlug: string
}
export const ShareActionButton: VFC<Props> = ({ postSlug }) => {
  const postUrl = `${
    process.env.NEXT_PUBLIC_API_HOST
  }${ROUTES.detailedPost.calcUrl({ postSlug })}`

  return (
    <ShareDropdown url={postUrl} contentType={'post'}>
      <ActionButton>
        <ShareIcon />
      </ActionButton>
    </ShareDropdown>
  )
}

const ShareIcon = styled(ShareIconBase)`
  width: 24px;
  height: 24px;
`
