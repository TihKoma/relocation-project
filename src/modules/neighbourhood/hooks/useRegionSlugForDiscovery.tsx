import { useQuery } from '@apollo/client'

import { useCookie } from '@/modules/cookie'
import { QUERY_DETECT_REGION } from '@/modules/neighbourhood'

const NEW_YORK_SLUG = 'new_york-a.f9x7goslwp-new_york'

export const useRegionSlugForDiscovery = (): [string, boolean] => {
  const regionSlug = useCookie((cookie) => cookie.last_discovery_region_slug)

  const { data, loading } = useQuery(QUERY_DETECT_REGION, {
    skip: !!regionSlug,
    ssr: true,
  })

  return [regionSlug || data?.detectRegion?.slug || NEW_YORK_SLUG, loading]
}
