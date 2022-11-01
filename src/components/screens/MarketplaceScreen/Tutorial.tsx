import { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { CircleTooltip } from '@/components/ui-kit/CircleTooltip/CircleTooltip'
import { ArrowRight as ArrowRightBase, WhiteHeartIcon } from '@/images'
import { useIsMobileDevice } from '@/modules/device'

const IS_VISITED_KEY = 'is-marketplace-visited'

export const Tutorial: FC = () => {
  const [isTutorialVisible, setIsTutorialVisible] = useState(false)
  const isMobile = useIsMobileDevice()

  const circleTooltipOffset = isMobile
    ? { top: 17, right: -9 }
    : { top: 10, left: -7 }

  const onTutorialClose = () => {
    sessionStorage?.setItem(IS_VISITED_KEY, 'true')
    setIsTutorialVisible(false)
  }

  useEffect(() => {
    const isFirstTime = !sessionStorage?.getItem(IS_VISITED_KEY)
    setIsTutorialVisible(isFirstTime)

    setTimeout(onTutorialClose, 10000)
  }, [setIsTutorialVisible])

  return (
    <CircleTooltip
      text={'Add the object to your favorites to follow the price changes'}
      buttonText={'Got it'}
      isVisible={isTutorialVisible}
      onRequestClose={onTutorialClose}
      onButtonClick={onTutorialClose}
      options={{
        offset: circleTooltipOffset,
        withIcons: true,
        withModal: isMobile,
        contentPosition: isMobile ? 'left' : 'right',
      }}
      icons={[<WhiteHeartIcon />, !isMobile ? <ArrowRight /> : <></>]}
    />
  )
}

const ArrowRight = styled(ArrowRightBase)`
  align-self: center;
`
