import { FC } from 'react'
import styled from '@emotion/styled'
import { Controller, ControllerRenderProps, FieldValues } from 'react-hook-form'

import { FieldProfilePhoto } from '@/components/shared/ProfilePhoto'
import { Button as ButtonBase } from '@/components/ui-kit/Button'
import { FileInput as FileInputBase } from '@/components/ui-kit/form/FileInput'
import { CoverIcon, CrossIcon } from '@/images'
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  className?: string
}

export const EditImagesSection: FC<Props> = ({ className }) => {
  return (
    <Container className={className}>
      <Controller
        name={'coverUrl'}
        render={({ field }) => {
          return (
            <Cover css={{ backgroundImage: `url(${field.value})` }}>
              <Button
                size={'small'}
                viewType={'primary'}
                backgroundUnderButton={'map'}
                onClick={() => (field.value ? field.onChange?.('') : null)}
                Icon={
                  field.value ? (
                    <CrossIcon />
                  ) : (
                    <FileInput onChange={field.onChange}>
                      <CoverIcon />
                    </FileInput>
                  )
                }
              />
            </Cover>
          )
        }}
      />
      <BottomBlock />
      <Photo>
        <Controller
          name={'photoUrl'}
          render={(input) => (
            <FieldProfilePhoto
              {...input}
              field={input.field as ControllerRenderProps<FieldValues, string>}
            />
          )}
        />
      </Photo>
    </Container>
  )
}

const Container = styled.div`
  height: 23.9rem;
  width: 100%;

  position: relative;
`
const Cover = styled.div`
  height: 19.9rem;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-position: center;
  background-size: cover;
  background-color: ${getColorTheme('moon')};
  background-repeat: no-repeat;

  ${notMobileMedia} {
    border-top-left-radius: 1.6rem;
    border-top-right-radius: 1.6rem;
  }
`
const Button = styled(ButtonBase)`
  position: absolute;
  left: 2.4rem;
  top: 2.4rem;
`

const Photo = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
`

const BottomBlock = styled.div`
  height: 0.8rem;
  width: 100%;

  position: absolute;
  bottom: 4rem;

  background-color: ${getColorTheme('earth')};

  ${notMobileMedia} {
    border-top-left-radius: 2.2rem;
    border-top-right-radius: 2.2rem;
  }
`
const FileInput = styled(FileInputBase)`
  width: 100%;
  height: 100%;
`
