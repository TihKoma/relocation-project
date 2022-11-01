import { FC } from 'react'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { LoadingState } from '@/components/shared/LoadingState'
import { Loader } from '@/components/ui-kit/Loader'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { EditIcon as EditIconBase } from '@/images'
import { QUERY_RELOCATION_PROJECT } from '@/modules/relocation-project'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Form } from './Form'

type Props = {
  className?: string
}
export const EditLocations: FC<Props> = ({ className }) => {
  const [editFormIsOpen, setEditFormIsOpen] = useState(false)

  const openForm = () => {
    setEditFormIsOpen(true)
  }
  const closeModal = () => {
    setEditFormIsOpen(false)
  }

  const { data: relocationProjectData, loading } = useQuery(
    QUERY_RELOCATION_PROJECT,
  )

  return (
    <>
      <Container className={className} onClick={openForm}>
        <LoadingState
          loading={loading}
          loadingComponent={<Loader withGradient size={'small'} />}
        >
          From <b>{relocationProjectData?.relocationProject?.whereFrom} </b>
          to <b>{relocationProjectData?.relocationProject?.whereTo}</b>
          <EditIcon />
        </LoadingState>
      </Container>
      <ModalPortal onRequestClose={closeModal} isVisible={editFormIsOpen}>
        <Form onRequestClose={closeModal} />
      </ModalPortal>
    </>
  )
}

const Container = styled.div`
  width: 100%;

  position: relative;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  cursor: pointer;

  ${notMobileMedia} {
    padding-right: 2.4rem;

    line-height: 2.4rem;
  }

  ${mobileMedia} {
    height: 4rem;
    padding-left: 1.6rem;
    padding-right: 4rem;

    border: 1px solid ${getColorTheme('strokeDefaultSecondary')};
    border-radius: 1.2rem;

    line-height: 4rem;
  }

  & > b {
    font-weight: 500;
  }
`
const EditIcon = styled(EditIconBase)`
  position: absolute;
  top: 50%;

  transform: translateY(-50%);
  fill: ${getColorTheme('iconSecondary')};

  ${notMobileMedia} {
    right: 0;
  }

  ${mobileMedia} {
    right: 1.6rem;
  }
`
