import { FC, useState } from 'react'

import { CircleTooltip } from '@/components/ui-kit/CircleTooltip/CircleTooltip'

type Props = {
  isVisible: boolean
  onRequestClose: () => void
}
export const Onboarding: FC<Props> = ({ isVisible, onRequestClose }) => {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <>
      {currentStep === 1 && (
        <CircleTooltip
          isVisible={isVisible}
          onButtonClick={() => setCurrentStep(2)}
          onRequestClose={onRequestClose}
          buttonText={'Got it'}
          text={
            'We have selected neighborhoods for living that are ideal for you'
          }
          description={'You can explore them both on the map and as a list'}
          options={{ offset: { top: 6.8, left: -7 }, withModal: true }}
        />
      )}

      {currentStep === 2 && (
        <CircleTooltip
          isVisible={isVisible}
          onButtonClick={onRequestClose}
          onRequestClose={onRequestClose}
          buttonText={'Let’s start'}
          text={
            'Tap on the neighborhood to get more info about it and discover real estate'
          }
          description={
            'If you like it, then add it to your relocation list. Then you can select it as a destination'
          }
          options={{
            offset: { top: 26, right: -7 },
            withModal: true,
            contentPosition: 'left',
          }}
        />
      )}
    </>
  )
}
