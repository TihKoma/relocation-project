import { FC, useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useFormContext, useFormState } from 'react-hook-form'

import { PostFormStageContext } from '@/components/shared/PostForm/post-form-stage-context'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { Dropdown as DropdownBase } from '@/components/ui-kit/Dropdown'
import { Option } from '@/components/ui-kit/form/Options'
import {
  ArrowDownIcon,
  FollowingsIcon as FollowingsIconBase,
  NeighborhoodIcon as NeighborhoodIconBase,
} from '@/images'
import { getColorTheme } from '@/styles/themes'

type Props = {}
export const StageSelector: FC<Props> = () => {
  const { touchedFields } = useFormState()

  const [_, setFormStage] = useContext(PostFormStageContext)

  const { watch } = useFormContext()
  const region = watch('region')
  const group = watch('group')

  const [title, setTitle] = useState('')

  useEffect(() => {
    if (group) {
      setTitle(group.name)
      return
    }
    if (region) {
      setTitle(region.name)
      return
    }
    setTitle('Neighborhood')
  }, [group, region])

  return (
    <Container>
      Post to
      <Dropdown
        buttonRender={({ isDropdownOpened, referenceProps }) => (
          <Button
            data-test-id={'create-post:select-destination-button'}
            isDropdownOpened={isDropdownOpened}
            isError={touchedFields.content && !region}
            {...referenceProps}
          >
            <SelectionTitle>{title}</SelectionTitle>
            <ArrowIcon isDropdownOpened={isDropdownOpened} />
          </Button>
        )}
      >
        {() => {
          return (
            <div>
              <Option onClick={() => setFormStage('neighborhood')}>
                <NeighborhoodIcon />
                Post in Neighborhood
              </Option>
              <Option onClick={() => setFormStage('group')}>
                <FollowingsIcon />
                Post in Group
              </Option>
            </div>
          )
        }}
      </Dropdown>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 0.8rem;
  align-items: center;

  font-size: 1.4rem;
  white-space: nowrap;
`
const Button = styled(NormalizedButton)<{
  isDropdownOpened: boolean
  isError: boolean
}>`
  height: 3.2rem;
  min-width: 4rem;
  padding: 0 1.2rem;

  display: grid;
  grid-auto-flow: column;
  gap: 0.4rem;
  align-items: center;

  border: 0.2rem solid ${getColorTheme('sun200')};
  border-radius: 4rem;
  cursor: pointer;
  border-color: ${(props) => {
    if (props.isError) {
      return getColorTheme('mars')(props)
    }
    if (props.isDropdownOpened) {
      return getColorTheme('neptune600')(props)
    }
    return getColorTheme('sun200')(props)
  }};

  font-size: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
`
const ArrowIcon = styled(ArrowDownIcon)<{ isDropdownOpened: boolean }>`
  transform: rotate(${(props) => (props.isDropdownOpened ? '-180deg' : '0')});
  transition: 0.225s;
`
const NeighborhoodIcon = styled(NeighborhoodIconBase)`
  fill: ${getColorTheme('sun500')};
`
const FollowingsIcon = styled(FollowingsIconBase)`
  fill: ${getColorTheme('sun500')};
`
const Dropdown = styled(DropdownBase)`
  display: flex;
  overflow: hidden;
`
const SelectionTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`
