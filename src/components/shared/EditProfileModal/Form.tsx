import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useImperativeHandle,
} from 'react'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui-kit/Button'
import {
  GraphqlProfile,
  MUTATION_UPDATE_USER_PROFILE,
  QUERY_GET_PUBLIC_PROFILE,
  QUERY_GET_USER_PROFILE,
} from '@/modules/profile'
import { useAlertBeforeUnload } from '@/modules/utils/useAlertBeforeUnload'
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { AboutMeSection } from './AboutMeSection'
import { ContactsSection } from './ContactsSection'
import { EditImagesSection as EditImagesSectionBase } from './EditImagesSection'
import { Screen } from './EditProfileModal'

const US_CODE = '1'

const defaultValues = {
  email: '',
  phone: US_CODE,
}

export type FormRef = {
  isDirty: () => boolean
}

type Props = {
  profile: GraphqlProfile
  onClose: (isSuccess: boolean) => void
  setScreen: Dispatch<SetStateAction<Screen>>
}

export const Form = forwardRef<FormRef, Props>(
  ({ profile, onClose, setScreen }, ref) => {
    const methods = useForm({ defaultValues: { ...defaultValues, ...profile } })

    const { setValue, handleSubmit, formState } = methods
    const { dirtyFields } = formState
    const [updateProfile] = useMutation(MUTATION_UPDATE_USER_PROFILE, {
      refetchQueries: [QUERY_GET_PUBLIC_PROFILE, QUERY_GET_USER_PROFILE],
    })

    useImperativeHandle(
      ref,
      () => ({
        isDirty: () =>
          !!(
            dirtyFields.firstName ||
            dirtyFields.lastName ||
            dirtyFields.userName ||
            dirtyFields.bio ||
            dirtyFields.photoUrl ||
            dirtyFields.coverUrl
          ),
      }),
      [
        dirtyFields.firstName,
        dirtyFields.lastName,
        dirtyFields.userName,
        dirtyFields.bio,
        dirtyFields.photoUrl,
        dirtyFields.coverUrl,
      ],
    )

    useEffect(() => {
      if (profile) {
        methods.reset({
          ...profile,
          phone: profile.phone ?? defaultValues.phone,
        })
      }
    }, [methods, profile])

    const onSubmit = handleSubmit(({ firstName, lastName, bio, userName }) => {
      setValue('firstName', firstName.trim())
      setValue('lastName', lastName.trim())
      setValue('bio', bio.trim())
      setValue('userName', userName.trim().toLowerCase())
      handleSubmit(
        async ({
          firstName,
          lastName,
          bio,
          phone,
          photoUrl,
          coverUrl,
          userName,
        }) => {
          try {
            await updateProfile({
              variables: {
                input: {
                  firstName,
                  lastName,
                  bio,
                  phone,
                  photoUrl,
                  coverUrl,
                  userName,
                },
              },
              refetchQueries: [
                QUERY_GET_USER_PROFILE,
                QUERY_GET_PUBLIC_PROFILE,
              ],
            })

            onClose(true)
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e)
          }
        },
      )()
    })

    const shouldPreventUnload = formState.isDirty
    useAlertBeforeUnload(
      shouldPreventUnload,
      'Are you sure you want to leave without saving?',
    )

    return (
      <FormProvider {...methods}>
        <Container onSubmit={onSubmit}>
          <Fields>
            <ImagesContainer>
              <EditImagesSection />
            </ImagesContainer>
            <Inputs>
              <AboutMeSection />
              <ContactsSection setScreen={setScreen} />
            </Inputs>
          </Fields>
          <Footer>
            <Button
              viewType={'primary'}
              size={'large'}
              type={'submit'}
              disabled={!formState.isDirty}
              data-test-id={'edit-profile-modal:submit-button'}
            >
              Save
            </Button>
          </Footer>
        </Container>
      </FormProvider>
    )
  },
)

const Container = styled.form`
  max-height: 100%;

  background-color: ${getColorTheme('earth')};

  display: grid;
  grid-template-rows: 1fr auto;

  overflow: hidden;
`

const ImagesContainer = styled.div`
  ${notMobileMedia} {
    padding: 0 2.4rem;
  }
`
const EditImagesSection = styled(EditImagesSectionBase)`
  margin-bottom: 1.6rem;
`
const Fields = styled.div`
  overflow-y: auto;
`
const Inputs = styled.div`
  padding: 0 2.4rem;
`
const Footer = styled.div`
  padding: 2.4rem;

  display: grid;

  background-color: ${getColorTheme('earth')};
`
