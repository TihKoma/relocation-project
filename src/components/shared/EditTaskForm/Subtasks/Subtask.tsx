import { forwardRef, useImperativeHandle } from 'react'
import styled from '@emotion/styled'
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from 'react-hook-form'

import { Checkbox as CheckboxBase } from '@/components/ui-kit/Checkbox'
import { FieldTextArea } from '@/components/ui-kit/form/TextArea'
import { DeleteSubTaskIcon as DeleteSubTaskIconBase } from '@/images'
import { getColorTheme } from '@/styles/themes'

const TITLE_MAX_LETTERS = 150
const DESCRIPTION_MAX_LETTERS = 300

type FormModel = {
  title: string
  description: string
  isCompleted: boolean
}

export type SubtaskContent = {
  id?: string
  localId?: string
  title: string
  description: string
  isCompleted: boolean
  isDeleted?: boolean
}

type Props = {
  initialValues?: FormModel
  onDelete: () => void
  onChange?: () => void
}

export type SubtaskRef = {
  getValues: () => FormModel
}

export const Subtask = forwardRef<SubtaskRef, Props>(
  ({ initialValues, onDelete, onChange }, ref) => {
    const { control, getValues, watch, setValue } = useForm<FormModel>({
      defaultValues: initialValues,
    })

    const isCompleted = watch('isCompleted')

    useImperativeHandle(
      ref,
      () => ({
        getValues,
      }),
      [getValues],
    )

    return (
      <Container>
        <Checkbox
          isChecked={isCompleted}
          onChange={() => {
            setValue('isCompleted', !isCompleted)
            onChange?.()
          }}
        />
        <Content>
          <Controller
            control={control}
            name={'title'}
            rules={{ maxLength: TITLE_MAX_LETTERS }}
            render={(input) => {
              return (
                <TaskNameInput
                  autoresize
                  withHighlightLinks
                  maxLength={TITLE_MAX_LETTERS}
                  data-test-id={'create-task'}
                  initialInputHeight={24}
                  placeholder={'Task name'}
                  ref={input.field.ref}
                  {...input}
                  onChange={(value) => {
                    setValue('title', value)
                    onChange?.()
                  }}
                  field={
                    input.field as unknown as ControllerRenderProps<
                      FieldValues,
                      string
                    >
                  }
                />
              )
            }}
          />
          <Controller
            control={control}
            name={'description'}
            rules={{ maxLength: DESCRIPTION_MAX_LETTERS }}
            render={(input) => {
              return (
                <DescriptionInput
                  autoresize
                  withHighlightLinks
                  maxLength={DESCRIPTION_MAX_LETTERS}
                  data-test-id={'create-task'}
                  initialInputHeight={24}
                  placeholder={'Write something...'}
                  ref={input.field.ref}
                  {...input}
                  onChange={(value) => {
                    setValue('description', value)
                    onChange?.()
                  }}
                  field={
                    input.field as unknown as ControllerRenderProps<
                      FieldValues,
                      string
                    >
                  }
                />
              )
            }}
          />
        </Content>
        <DeleteSubTaskIcon onClick={onDelete} />
      </Container>
    )
  },
)

const Container = styled.div`
  display: flex;
  border-bottom: 0.1rem solid ${getColorTheme('backgroundDefaultTertiary')};
`
const Checkbox = styled(CheckboxBase)`
  margin-right: 1.6rem;
`
const Content = styled.div`
  flex-grow: 1;
`
const DeleteSubTaskIcon = styled(DeleteSubTaskIconBase)`
  cursor: pointer;
`
const TaskNameInput = styled(FieldTextArea)`
  margin-bottom: 1.2rem;

  & > textarea {
    border: none;
    outline: none;
    resize: none;

    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.4rem;
    font-feature-settings: 'liga' off;
    color: ${getColorTheme('textDefaultPrimary')};

    ::placeholder {
      font-size: 1.8rem;
      color: ${getColorTheme('textDefaultSecondary')};
    }
  }
`
const DescriptionInput = styled(FieldTextArea)`
  margin-bottom: 1.6rem;

  & > textarea {
    border: none;
    outline: none;
    resize: none;

    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-feature-settings: 'liga' off;
    color: ${getColorTheme('textDefaultPrimary')};

    ::placeholder {
      font-size: 1.6rem;
      color: ${getColorTheme('textDefaultSecondary')};
    }
  }
`
