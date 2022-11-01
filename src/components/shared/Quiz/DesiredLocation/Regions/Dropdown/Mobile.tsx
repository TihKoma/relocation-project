import { useEffect, useRef, useState, VFC } from 'react'
import styled from '@emotion/styled'

import {
  SubTitleMobile,
  TitleModal,
  titleSelectedRegions,
} from '@/components/shared/Quiz/shared/shared'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { Input } from '@/components/ui-kit/form/Input'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { CrossIcon } from '@/images'
import { notMobileMedia } from '@/styles/media'

import { DropdownBase, Props } from './Base'

const DropdownMobile: VFC<Props> = ({
  className,
  onChange,
  label,
  ...props
}) => {
  const [isShowModal, setIsShowModal] = useState(false)
  const close = () => {
    setIsShowModal(false)
  }

  const inputMobileRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (isShowModal && inputMobileRef.current) {
      inputMobileRef.current.focus()
    }
  }, [isShowModal])

  return (
    <>
      <Input
        className={className}
        value={''}
        onChange={() => {}}
        label={label}
        onClick={() => {
          setIsShowModal(true)
        }}
        prefix={({ magnifierIcon }) => magnifierIcon}
      />
      <Modal isVisible={isShowModal} onRequestClose={close}>
        <ModalContainer>
          <TitleModal>
            {titleSelectedRegions}
            <CrossButton onClick={() => setIsShowModal(false)}>
              <CrossIcon />
            </CrossButton>
          </TitleModal>
          <SubTitleMobile>
            At the moment Where only covers United States.
          </SubTitleMobile>
          <DropdownBase
            ref={inputMobileRef}
            onChange={(regions) => {
              onChange(regions)
              close()
            }}
            label={label}
            {...props}
          />
        </ModalContainer>
      </Modal>
    </>
  )
}

export const DropdownMobileStyled = styled(DropdownMobile)`
  ${notMobileMedia} {
    display: none;
  }
`
const Modal = styled(ModalPortal)`
  padding: 1.6rem;

  background: white;
`
const ModalContainer = styled.div`
  margin: 0 !important;
  width: 100%;

  display: flex;
  flex-direction: column;
`
const CrossButton = styled(NormalizedButton)`
  position: absolute;
  right: 0;
  top: 50%;

  transform: translateY(-50%);
`
