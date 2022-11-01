import { useRouter } from 'next/router'

import { ShareDropdown } from '@/components/shared/ShareDropdown'
import { Button } from '@/components/ui-kit/Button'
import { ShareIcon } from '@/images/postActions'

export const ShareButton = () => {
  const router = useRouter()
  const currentPageUrl = `${process.env.NEXT_PUBLIC_API_HOST}${router.asPath}`

  return (
    <ShareDropdown
      url={currentPageUrl}
      contentType={'group'}
      offset={[-99, -4]}
    >
      <Button
        size={'small'}
        viewType={'ghost'}
        data-test-id={'group-header:share-button'}
        Icon={<ShareIcon />}
      />
    </ShareDropdown>
  )
}
