import { forwardRef, useEffect, useState } from 'react'

import { RegionScores } from '@/components/shared/RegionScores'
import { useAnalytics } from '@/modules/analytics'
import { ROUTES } from '@/modules/router'

import { PartContainer } from './PartContainer'
import { PartTitle } from './PartTitle'

const WAS_SHOW_FULL_VERSION_STORAGE_KEY = 'wasShowQuizResultFullDetailedListing'

type Props = {
  title: string
  regionId: string
  regionSlug: string
}

export const QuizResultPart = forwardRef<HTMLDivElement, Props>(
  ({ title, regionId, regionSlug }, ref) => {
    const analytics = useAnalytics()
    const [isFullVersion, setIsFullVersion] = useState(false)

    // Show the full version at the first time
    useEffect(() => {
      if (localStorage.getItem(WAS_SHOW_FULL_VERSION_STORAGE_KEY) !== 'true') {
        setIsFullVersion(true)
        localStorage.setItem(WAS_SHOW_FULL_VERSION_STORAGE_KEY, 'true')
      }
    }, [])

    return (
      <PartContainer ref={ref}>
        <PartTitle
          title={title}
          onClick={() => {
            analytics.MPDetailedListingAboutLocation()
          }}
          link={{
            href: ROUTES.area.calcUrl({
              regionSlug,
            }),
            text: 'About',
          }}
        />
        <RegionScores
          sortFactors={(factors, swapFactors) => {
            const result = [...factors]

            result.forEach((factor, index) => {
              if (factor.name === 'Schools') {
                swapFactors(result, factor, index, 0)
              }

              if (factor.name === 'Safety') {
                swapFactors(result, factor, index, 1)
              }
            })

            return result
          }}
          regionId={regionId}
          mini={!isFullVersion}
          countShowPreviewDesktop={2}
          countShowPreviewMobile={2}
        />
      </PartContainer>
    )
  },
)
