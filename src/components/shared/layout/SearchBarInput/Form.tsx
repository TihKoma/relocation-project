import { useEffect, VFC } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ReactComponent as MagnifierIconBase } from '@/images/mag.svg'
import { useAnalytics } from '@/modules/analytics'
import { useIsMobileDevice } from '@/modules/device'
import { ROUTES } from '@/modules/router'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { getColorTheme } from '@/styles/themes'

type FormInput = {
  search: string
}

type Props = {
  setIsFocused: (value: boolean) => void
  isFocused: boolean
  onChange: (value: string) => void
  onSubmit: (search: string) => void
  initialValue?: string
}

export const Form: VFC<Props> = ({
  setIsFocused,
  onChange,
  initialValue,
  isFocused,
  onSubmit: onSubmitProp,
}) => {
  const { reset, register, handleSubmit } = useForm<FormInput>({
    defaultValues: { search: initialValue },
  })
  const routing = useRouter()
  const analitycs = useAnalytics()

  useEffect(() => {
    reset({ search: initialValue })
  }, [initialValue, reset])

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    analitycs.searchOpenResult(data.search)
    routing.push(ROUTES.search.calcUrl({ query: data.search }))
    onSubmitProp(data.search)
  }

  const isMobile = useIsMobileDevice()
  const placeholder = isMobile ? '' : 'Search'

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Input
        isFocused={isFocused}
        autoFocus={isMobile && !initialValue}
        placeholder={placeholder}
        data-test-id={'Search:input'}
        autoComplete={'off'}
        {...register('search', {
          required: true,
          maxLength: 70,
          onBlur: () => setIsFocused(false),
          onChange: (e) => {
            onChange(e.target.value)
          },
        })}
        onFocus={() => {
          setIsFocused(true)
          analitycs.searchInput()
        }}
      />
      <MagnifierIcon />
    </Container>
  )
}

const Container = styled.form`
  height: 4rem;
`
// TODO move base styles to InputBase
const Input = styled.input<{ isFocused: boolean }>`
  width: 100%;
  height: 100%;
  padding: 0 1.6rem 0 4.8rem;

  border: 1px solid ${getColorTheme('milkyway')};
  border-radius: 1.2rem;
  outline: none;

  transition: ${HOVER_TRANSITION_TIME};

  font-size: 1.6rem;

  &:hover,
  :focus {
    box-shadow: 0 2px 4px rgba(18, 21, 31, 0.08),
      0 4px 16px 1px rgba(18, 21, 31, 0.08);
    border-color: transparent;
  }
  ::placeholder {
    color: ${getColorTheme('mercury')};
  }
`
const MagnifierIcon = styled(MagnifierIconBase)`
  position: relative;
  left: 1.8rem;
  transform: translateY(-150%);

  stroke: ${getColorTheme('mercury')};
`
