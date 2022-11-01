import { FC, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { limitShift, offset, shift } from '@floating-ui/react-dom'
import {
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react-dom-interactions'

import { SharePopup as SharePopupBase } from '@/components/shared/ShareDropdown'
import { Option, Options } from '@/components/ui-kit/form/Options'
import { BigPlusIcon, MinusIcon, ShareIcon } from '@/images'
import {
  useFollowNeighborhood,
  useUnfollowNeighborhood,
} from '@/modules/neighbourhood'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'

import { SubscriptableType } from '../../../../__generated__/globalTypes'

type MenuType = {
  subscribed: boolean
  regionId: string
  regionSlug: string
}
export const OptionsMenu: FC<MenuType> = ({
  subscribed,
  regionId,
  regionSlug,
}) => {
  const [follow] = useFollowNeighborhood()

  const onFollow = useCallback(() => {
    if (regionId) {
      follow({
        variables: {
          input: {
            subscriptableId: regionId,
            subscriptableType: SubscriptableType.REGION,
          },
        },
      })
    }
  }, [follow, regionId])

  const [unfollow] = useUnfollowNeighborhood()

  const onUnfollow = useCallback(() => {
    if (regionId) {
      unfollow({
        variables: {
          subscriptableId: regionId,
        },
      })
    }
  }, [unfollow, regionId])

  const areaUrl = `${process.env.NEXT_PUBLIC_API_HOST}${ROUTES.area.calcUrl({
    regionSlug,
  })}`

  const [isShowSharePopup, setIsShowSharePopup] = useState(false)
  const closeSharePopup = () => setIsShowSharePopup(false)
  const openSharePopup = () => setIsShowSharePopup(true)

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeSharePopup()
    }
  }

  const {
    x: shareX,
    y: shareY,
    reference: shareReference,
    floating: shareFloating,
    strategy: shareStrategy,
    context: shareContext,
  } = useFloating({
    open: isShowSharePopup,
    onOpenChange: (isShowSharePopup) => {
      setIsShowSharePopup(isShowSharePopup)
    },
    placement: 'bottom',
    strategy: 'fixed',
    middleware: [
      offset(8),
      shift({
        limiter: limitShift({
          offset: ({ rects }) => ({
            mainAxis: rects.floating.width,
          }),
        }),
      }),
    ],
  })

  const {
    getReferenceProps: getShareReferenceProps,
    getFloatingProps: getShareFloatingProps,
  } = useInteractions([
    useDismiss(shareContext, {
      ancestorScroll: true,
    }),
  ])

  const shareReferenceProps = getShareReferenceProps({ ref: shareReference })
  const shareFloatingProps = {
    ...getShareFloatingProps({ ref: shareFloating }),
    style: {
      position: shareStrategy,
      top: shareY ?? '',
      left: shareX ?? '',
    },
  }

  return (
    <>
      {isShowSharePopup && (
        <SharePopup
          {...shareFloatingProps}
          url={areaUrl}
          contentType={'region'}
          onClose={closeSharePopup}
        />
      )}
      <div {...shareReferenceProps}>
        <Options
          onOpenChange={onOpenChange}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
        >
          {subscribed ? (
            <Option
              icon={<MinusIcon />}
              onClick={(event) => {
                event.preventDefault()
                onUnfollow()
              }}
            >
              Remove from favorites
            </Option>
          ) : (
            <Option
              icon={<BigPlusIcon />}
              onClick={(event) => {
                event.preventDefault()
                onFollow()
              }}
            >
              Add to favorites
            </Option>
          )}
          <Option icon={<ShareIcon />} onClick={openSharePopup}>
            Share
          </Option>
        </Options>
      </div>
    </>
  )
}

const SharePopup = styled(SharePopupBase)`
  z-index: 100;

  ${mobileMedia} {
    left: unset !important;
    right: 3.2rem !important;
  }
`
