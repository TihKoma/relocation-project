import { VFC } from 'react'
import styled from '@emotion/styled'
import { UseControllerReturn } from 'react-hook-form/dist/types/controller'

import { getColorTheme } from '@/styles/themes'

import { Dropdown, Value } from './Dropdown'
import { SelectedRegions } from './SelectedRegions'

type Props = {
  value: Value
  onChange: (value: Value) => void
}

const limitRegions = 4

const Regions: VFC<Props> = ({ value = [], onChange }) => {
  return (
    <>
      <SelectedRegions
        regions={value}
        removeRegions={(region) =>
          onChange(value.filter(({ id }) => id !== region.id))
        }
      />
      {value.length < limitRegions ? (
        <Dropdown value={value} onChange={onChange} />
      ) : (
        <Warning>
          Up to four different locations are currently supported
        </Warning>
      )}
    </>
  )
}

const Warning = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('saturn')};
`

export const FieldRegions: VFC<
  UseControllerReturn & Omit<Props, 'value' | 'onChange'>
> = ({
  field: {
    // for remove warning about component without forwardRef
    ref: _,
    ...field
  },
  ...props
}) => {
  return <Regions {...field} {...props} />
}
