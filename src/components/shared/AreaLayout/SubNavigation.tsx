import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { CommentsIcon, MarketIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { useSearchFiltersByQuizId } from '@/modules/marketplace'
import { ROUTES } from '@/modules/router'

export const SubNavigation = () => {
  const router = useRouter()
  const regionSlug = router.query.regionSlug as string

  const analytics = useAnalytics()

  const filters = useSearchFiltersByQuizId()

  return (
    <Container>
      <Link href={ROUTES.areaFeed.calcUrl({ regionSlug })} passHref shallow>
        <Button
          size={'small'}
          viewType={'primary'}
          backgroundUnderButton={'map'}
          as={'a'}
          Icon={<CommentsIcon />}
        >
          Posts
        </Button>
      </Link>
      <Link
        href={ROUTES.areaRealEstate.calcUrl({ regionSlug, filters })}
        passHref
        shallow
      >
        <Button
          size={'small'}
          viewType={'primary'}
          backgroundUnderButton={'map'}
          onClick={() => {
            analytics.MPFiltersButtonClick()
          }}
          as={'a'}
          Icon={<MarketIcon />}
          iconPosition={'left'}
        >
          Real Estate
        </Button>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  gap: 0.8rem;
  grid-template-columns: auto 1fr;
  justify-self: start;
  align-self: start;
`
