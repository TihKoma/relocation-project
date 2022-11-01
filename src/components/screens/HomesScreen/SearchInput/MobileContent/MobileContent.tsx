import { FC, useState } from 'react'

import { Form } from '../Form'
import { MobileEditScreen } from './MobileEditScreen'

type Props = {}

export const MobileContent: FC<Props> = () => {
  const [isMobileEditScreen, setIsMobileEditScreen] = useState(false)

  return (
    <>
      <Form
        onClick={() => {
          setIsMobileEditScreen(true)
        }}
      />
      {isMobileEditScreen && (
        <MobileEditScreen onRequestClose={setIsMobileEditScreen} />
      )}
    </>
  )
}
