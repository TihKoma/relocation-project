import { FC, useRef } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { UseControllerReturn } from 'react-hook-form/dist/types/controller'

import { LoadingState } from '@/components/shared/LoadingState'
import { Header } from '@/components/shared/Location/Header'
import { BasicSourceData } from '@/components/shared/PostForm/types'
import { Loader } from '@/components/ui-kit/Loader'
import { QUERY_SEARCH_GROUPS } from '@/modules/group'
import {
  useInfinityScrollProvider,
  useOnScrollProvider,
} from '@/modules/infinity-scroll'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { getColorTheme } from '@/styles/themes'

type FormModel = {
  group: BasicSourceData
}

type FieldChoiceGroupProps = {
  onChange?: (group: BasicSourceData, region?: BasicSourceData) => void
  onBack: () => void
  onRequestClose: () => void
} & UseControllerReturn

export const FieldChoiceGroup: FC<FieldChoiceGroupProps> = ({
  field,
  onChange,
  ...props
}) => {
  return (
    <ChoiceGroup
      {...field}
      {...props}
      onSubmit={(group: BasicSourceData, region?: BasicSourceData) => {
        field.onChange(group)
        onChange?.(group, region)
      }}
    />
  )
}

type ChoiceGroupProps = {
  onRequestClose: () => void
  onBack: () => void
  onSubmit: (group: BasicSourceData, region?: BasicSourceData) => void
}

const PAGINATION_START_POSITION = 0
const PAGINATION_LIMIT = 20

const ChoiceGroup: FC<ChoiceGroupProps> = ({
  onRequestClose,
  onBack,
  onSubmit,
}) => {
  const methods = useForm<FormModel>({
    defaultValues: {
      group: undefined,
    },
  })

  const onClose = () => {
    onRequestClose()
  }

  const { data: { getUserProfile: myProfile } = {} } = useQuery(
    QUERY_GET_USER_PROFILE,
  )

  const { data, loading, error, fetchMore } = useQuery(QUERY_SEARCH_GROUPS, {
    ssr: false,
    skip: !myProfile,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    variables: {
      input: {
        memberUserId: myProfile?.userId,
        position: PAGINATION_START_POSITION,
        limit: PAGINATION_LIMIT,
      },
    },
  })

  const groups = data?.searchGroups.groups || []

  const prevPosition = useRef(PAGINATION_START_POSITION)

  const infinityScroll = useOnScrollProvider()

  useInfinityScrollProvider(() => {
    prevPosition.current = groups.length
    fetchMore({
      variables: {
        position: prevPosition.current,
      },
      updateQuery: (data, { fetchMoreResult }) => {
        return {
          ...data,
          listFollowedUsers: {
            ...data?.searchGroups,
            users: [
              ...(data?.searchGroups.groups ?? []),
              ...(fetchMoreResult?.searchGroups.groups ?? []),
            ],
          },
        }
      },
    })
  })

  return (
    <FormProvider {...methods}>
      <Header onClose={onClose} title={'Select group'} onBack={onBack} />
      <Form onScroll={infinityScroll}>
        <Controller
          name={'group'}
          render={({ field }) => {
            return (
              <LoadingState
                loading={loading}
                loadingComponent={<Loader />}
                error={error?.message}
              >
                <List>
                  {groups.map((item) => {
                    if (!item) return null
                    const onClick = () => {
                      const group = {
                        id: item.id,
                        name: item.name,
                      }
                      const region = item.region
                        ? {
                            id: item.region.id,
                            name: item.region.name,
                          }
                        : undefined
                      field.onChange(group)
                      onSubmit(group, region)
                      onClose()
                    }
                    return (
                      <Item onClick={onClick} key={item.id}>
                        {item.avatar && <Avatar src={item.avatar} />}
                        {item.name}
                      </Item>
                    )
                  })}
                </List>
              </LoadingState>
            )
          }}
        />
      </Form>
    </FormProvider>
  )
}

const Form = styled.form`
  max-height: 40rem;
  height: 100%;

  overflow: auto;
`
const List = styled.ul`
  padding: 0;
  margin: 0;

  list-style: none;
`
const Item = styled.li`
  padding: 1.2rem 1.6rem;

  display: grid;
  justify-content: start;
  align-items: center;
  grid-auto-flow: column;
  gap: 0.8rem;

  cursor: pointer;

  &:hover {
    background: ${getColorTheme('sun50')};
  }
`
const Avatar = styled.img`
  width: 3.2rem;
  height: 3.2rem;

  border-radius: 0.8rem;
`
