import { FC, MutableRefObject, useCallback, useEffect, useState } from 'react'
import Script from 'next/script'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import { upperFirst } from 'lodash'
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from 'react-hook-form'

import { showErrorToast } from '@/components/shared/Toast/show-toasts'
import { Button } from '@/components/ui-kit/Button'
import { FieldInput } from '@/components/ui-kit/form/Input'
import { FieldPhoneInput } from '@/components/ui-kit/form/PhoneInput'
import { useAnalytics } from '@/modules/analytics'
import { CountryCode } from '@/modules/authorization'
import { sendListhubEvent } from '@/modules/listhub'
import { MUTATION_SUBMIT_CONTACT_FORM } from '@/modules/listing'
import { GetUserProfile_getUserProfile } from '@/modules/profile/__generated__/GetUserProfile'
import { trustedFormScript } from '@/modules/trustedForm'
import {
  checkIsEmail,
  checkIsPhone,
  minLength,
  notOnlyEmptySymbols,
  onlyLatinLetters,
  required,
} from '@/modules/utils/validatores'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { SuccessfulSubmitComponent } from './SuccessfulSubmitComponent'

type ContactFormData = {
  firstName: string
  lastName: string
  phone: string
  email: string
  message?: string
}

type Props = {
  listingId: string
  internalId: string
  propertyType: string
  phone?: string
  onPhoneEdit: () => void
  className?: string
  userProfile?: GetUserProfile_getUserProfile | null
  verificationRequestId: string
  displayStartTime: MutableRefObject<number>
  onRequestClose: (value: boolean) => void
}

export const ContactForm: FC<Props> = ({
  listingId,
  propertyType,
  className,
  phone = '1',
  userProfile,
  verificationRequestId,
  displayStartTime,
  internalId,
  onRequestClose,
}) => {
  const [countryCode, setCountryCode] = useState<CountryCode>()
  const analytics = useAnalytics()
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      firstName: userProfile?.firstName,
      lastName: userProfile?.lastName,
      phone,
      email: userProfile?.email || '',
    },
  })

  useEffect(() => {
    if (phone) {
      setValue('phone', phone)
    }
  }, [phone, setValue])

  const firstNameValue = watch('firstName')
  const lastNameValue = watch('lastName')
  const phoneValue = watch('phone')
  const emailValue = watch('email')

  const onCountryCodeChange = useCallback((countryCode: CountryCode) => {
    setCountryCode(countryCode)
  }, [])

  const [submitContactForm] = useMutation(MUTATION_SUBMIT_CONTACT_FORM)
  const handleContactFormSubmit = handleSubmit((data) => {
    const trustedFormCertificateUrl =
      document
        .querySelector('[name="xxTrustedFormCertUrl"]')
        ?.getAttribute('value') || ''

    // Documentation: https://www.notion.so/nicity/Actual-Send-test-leads-marketplace-ffee429085944ef7b8b1c354a296789e
    const isTest =
      localStorage.getItem('marketplace-test-leads') === 'true' || false

    const normalizedData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value) {
        acc[key as keyof ContactFormData] = value
      }

      return acc
    }, {} as ContactFormData)

    submitContactForm({
      variables: {
        input: {
          ...normalizedData,
          formURL: window.location.href,
          leadType: propertyType,
          listingKey: listingId,
          certURL: trustedFormCertificateUrl,
          name: '',
          verificationRequestId,
          isTest,
        },
      },
      onCompleted: () => {
        sendListhubEvent('AGENT_EMAIL_SENT', listingId)
      },
    })
      .then(() => {
        setIsSubmitSuccessful(true)
      })
      .catch((error) => {
        showErrorToast(upperFirst(error?.message || 'Request error'))
        onRequestClose(false)
      })
  })

  if (isSubmitSuccessful) {
    return (
      <SuccessfulSubmitComponent
        displayStartTime={displayStartTime}
        internalId={internalId}
      />
    )
  }

  const isDisabled =
    !isDirty ||
    isSubmitting ||
    !firstNameValue ||
    !lastNameValue ||
    !phoneValue ||
    !emailValue

  return (
    <Form onSubmit={handleContactFormSubmit} className={className}>
      <Title>Get connected with an agent</Title>
      <Controller
        name={'firstName'}
        control={control}
        rules={{
          validate: {
            required: required(),
            notOnlyEmptySymbols: notOnlyEmptySymbols(),
            onlyLatinLetters: onlyLatinLetters(),
            minLength: minLength(2),
          },
        }}
        render={(input) => {
          return (
            <FieldInput
              {...input}
              field={
                input.field as unknown as ControllerRenderProps<
                  FieldValues,
                  string
                >
              }
              label={'First Name'}
              autoComplete={'given-name'}
              value={input.field.value}
              onChange={input.field.onChange}
            />
          )
        }}
      />
      <Controller
        name={'lastName'}
        control={control}
        rules={{
          validate: {
            required: required(),
            notOnlyEmptySymbols: notOnlyEmptySymbols(),
            onlyLatinLetters: onlyLatinLetters(),
            minLength: minLength(2),
          },
        }}
        render={(input) => {
          return (
            <FieldInput
              {...input}
              field={
                input.field as unknown as ControllerRenderProps<
                  FieldValues,
                  string
                >
              }
              label={'Last Name'}
              autoComplete={'family-name'}
              value={input.field.value}
              onChange={input.field.onChange}
            />
          )
        }}
      />
      <Controller
        name={'phone'}
        control={control}
        rules={{
          validate: {
            required: required(),
            notOnlyEmptySymbols: notOnlyEmptySymbols(),
            checkIsPhone: checkIsPhone(countryCode),
          },
        }}
        render={(input) => {
          return (
            <FieldPhoneInput
              {...input}
              field={
                input.field as unknown as ControllerRenderProps<
                  FieldValues,
                  string
                >
              }
              name={'phone'}
              error={input.fieldState.error?.message}
              autoComplete={'tel'}
              inputMode={'tel'}
              onCountryCodeChange={onCountryCodeChange}
              onChange={input.field.onChange}
            />
          )
        }}
      />
      <Controller
        name={'email'}
        control={control}
        rules={{
          validate: {
            required: required(),
            notOnlyEmptySymbols: notOnlyEmptySymbols(),
            checkIsEmail: checkIsEmail(),
          },
        }}
        render={(input) => {
          return (
            <FieldInput
              {...input}
              field={
                input.field as unknown as ControllerRenderProps<
                  FieldValues,
                  string
                >
              }
              label={'Email address'}
              autoComplete={'email'}
              inputMode={'email'}
              value={input.field.value || ''}
              onChange={input.field.onChange}
            />
          )
        }}
      />
      <Controller
        control={control}
        name={'message'}
        render={(input) => (
          <FieldInput
            label={'Message'}
            isMultiline
            {...input}
            field={
              input.field as unknown as ControllerRenderProps<
                FieldValues,
                string
              >
            }
            value={input.field.value ?? ''}
            onChange={input.field.onChange}
          />
        )}
      />
      <SubmitButton
        type={'submit'}
        viewType={'primary'}
        size={'large'}
        disabled={isDisabled}
        onClick={() => {
          analytics.MPContactAgentSubmitClick()
        }}
      >
        Submit
      </SubmitButton>
      <UserAgreement>
        By proceeding, you consent to receive calls, texts and voicemails at the
        number you provided (may be recorded and may be autodialed and use pre
        recorded and artificial voices), and email, from Nicity, Opcity,
        realtor.com and their network of service providers about your inquiry
        and other home-relatedmatters. Msg/data rates may apply. This consent
        applies even if you are on a do not call list and is not a condition of
        any purchase.
      </UserAgreement>
      <Script
        id={'trustedForm'}
        dangerouslySetInnerHTML={{ __html: trustedFormScript }}
      />
    </Form>
  )
}

const Form = styled.form`
  padding: 3.4rem 2.4rem;

  border-radius: 1.6rem;
  background-color: ${getColorTheme('earth')};

  ${mobileMedia} {
    padding: 2.8rem 1.6rem;
  }
`
const Title = styled.span`
  display: block;

  margin-bottom: 3.2rem;

  color: ${getColorTheme('sun')};
  font-size: 2.8rem;
  line-height: 3.6rem;
  letter-spacing: -0.05em;

  ${mobileMedia} {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
`
const SubmitButton = styled(Button)`
  width: 100%;

  margin-bottom: 2.4rem;
`
const UserAgreement = styled.span`
  display: block;

  color: ${getColorTheme('mercury')};
  font-size: 1.2rem;
  line-height: 1.6rem;
`
