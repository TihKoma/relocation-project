import { useState } from 'react'

import { CustomButton } from '@/components/shared/layout/NavigationBar/shared'
import { SearchServicesModal } from '@/components/shared/SearchServicesModal'
import { MoreIcon } from '@/images'

export const AllServicesButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <CustomButton
        onClick={() => {
          setIsModalVisible(true)
        }}
      >
        <MoreIcon />
        <span>All services</span>
      </CustomButton>
      {isModalVisible && (
        <SearchServicesModal
          onRequestClose={() => {
            setIsModalVisible(false)
          }}
        />
      )}
    </>
  )
}
