import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { toast, ToastOptions } from 'react-toastify'

import { CrossInCircleIcon as CrossInCircleIconBase, DoneIcon } from '@/images'

const successClassName = css`
  background-color: #19b296;
  color: white;
  border-radius: 12px;
`

const warningClassName = css`
  background-color: #f58648;
  color: white;
  border-radius: 12px;
`

const errorClassName = css`
  background-color: #f24852;
  color: white;
  border-radius: 12px;
`

const infoClassName = css`
  background-color: #12151f;
  color: white;
  border-radius: 12px;
`

const bodyClassName = css`
  align-items: flex-start;

  font-size: 14px;
  font-weight: 400;
`

export const showSuccessToast = (text: string, options: ToastOptions = {}) => {
  toast(text, {
    className: successClassName,
    bodyClassName: bodyClassName,
    autoClose: false,
    icon: <DoneIcon />,
    theme: 'dark',
    ...options,
  })
}

export const showWarningToast = (text: string, options: ToastOptions = {}) => {
  toast(text, {
    className: warningClassName,
    bodyClassName,
    autoClose: false,
    icon: <DoneIcon />,
    theme: 'dark',
    ...options,
  })
}

export const showErrorToast = (text: string, options: ToastOptions = {}) => {
  toast(text, {
    className: errorClassName,
    bodyClassName,
    autoClose: false,
    icon: <CrossInCircleIcon />,
    theme: 'dark',
    ...options,
  })
}

export const showInfoToast = (text: string, options: ToastOptions = {}) => {
  toast(text, {
    className: infoClassName,
    bodyClassName,
    autoClose: false,
    icon: <DoneIcon />,
    theme: 'dark',
    ...options,
  })
}

const CrossInCircleIcon = styled(CrossInCircleIconBase)`
  & path {
    fill: white;
    stroke: white;
  }
`
