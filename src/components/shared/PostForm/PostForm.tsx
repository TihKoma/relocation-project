import {
  FC,
  ForwardedRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { useApolloClient } from '@apollo/client'
import styled from '@emotion/styled'
import { FormProvider, useForm } from 'react-hook-form'

import { MAP_PREVIEW_ZOOM } from '@/components/shared/Location'
import { FileModel } from '@/components/shared/PostForm/Files'
import { GroupStage } from '@/components/shared/PostForm/stages/GroupStage'
import { showWarningToast } from '@/components/shared/Toast'
import { GeocodeFeature, QUERY_GET_REGIONS_BY_POINT } from '@/modules/map'
import { MediaType } from '@/modules/post'
import { mobileMedia, notMobileMedia } from '@/styles/media'

import { FORM_DESKTOP_FLEX_BASIS, FORM_PADDING } from './consts'
import {
  PostFormStageContext,
  PostFormStageContextProvider,
} from './post-form-stage-context'
import { LocationStage } from './stages/LocationStage'
import { MainStage } from './stages/MainStage'
import { NeighborhoodStage } from './stages/NeighborhoodStage'
import { BasicSourceData, PostFormModel, PostInitialValues } from './types'
import { useSubmitPost } from './use-submit-post'

export type PostFormRef = {
  isDirty: () => boolean
}
export type PostFormProps = {
  onClose: (success: boolean) => void
  initialValues: PostInitialValues
  className?: string
  title: string
  feedId?: string
  forwardedRef?: ForwardedRef<PostFormRef>
}

export const PostForm: FC<PostFormProps> = ({
  forwardedRef,
  className,
  onClose,
  initialValues: initialValuesBase,
  title,
  feedId,
}) => {
  const initialValues: PostFormModel = useInitialValues(initialValuesBase)

  const methods = useForm<PostFormModel>({
    defaultValues: initialValues,
  })

  const { formState, setValue, watch, setFocus } = methods

  // @ts-ignore
  const media = watch('media')

  const region = watch('region')
  const geoData = watch('geoData')

  const { isSubmitting, dirtyFields } = formState

  const { onGeoDataChange, onPreviewDeleted, geoPointRegionId } =
    useGeoDataPreview(
      // @ts-ignore
      setValue,
      geoData,
      region?.id,
    )

  const normalizedDirtyFields = useMemo(
    () => ({
      content: !!dirtyFields.content,
      geoData: !!dirtyFields.geoData,
      media: !!dirtyFields.media,
      group: !!dirtyFields.group,
      region: !!dirtyFields.region,
    }),
    [
      dirtyFields.content,
      dirtyFields.geoData,
      dirtyFields.media,
      dirtyFields.group,
      dirtyFields.region,
    ],
  )

  const onSubmit = useSubmitPost(
    initialValuesBase,
    initialValues.region?.id,
    region?.id,
    feedId,
    () => onClose(true),
    normalizedDirtyFields,
  )

  useImperativeHandle(
    forwardedRef,
    () => ({
      isDirty: () =>
        !!(
          dirtyFields.content ||
          dirtyFields.media ||
          dirtyFields.geoData ||
          dirtyFields.region ||
          dirtyFields.group
        ),
    }),
    [
      dirtyFields.content,
      dirtyFields.media,
      dirtyFields.geoData,
      dirtyFields.region,
      dirtyFields.group,
    ],
  )

  const onChangeNeighborhood = (region: BasicSourceData) => {
    setValue('group', undefined)
    if (geoPointRegionId && geoPointRegionId !== region.id) {
      setValue(
        'media',
        media.filter((file) => file.type !== MediaType.MAP),
      )
      onPreviewDeleted()
      showWarningToast('Geotag does not where the chosen neighborhood')
    }
  }

  const onChangeGroup = (_: BasicSourceData, region?: BasicSourceData) => {
    if (region) {
      setValue('region', region)
    }
  }

  // @ts-ignore
  const onFormSubmit = methods.handleSubmit(onSubmit)

  return (
    <FormProvider {...methods}>
      <PostFormStageContextProvider initialStage={'main'}>
        <Form onSubmit={onFormSubmit} className={className}>
          <PostFormStageContext.Consumer>
            {([formStage]) => {
              switch (formStage) {
                case 'location': {
                  return (
                    <LocationStage
                      regionId={region?.id}
                      onChange={onGeoDataChange}
                    />
                  )
                }
                case 'main': {
                  return (
                    <MainStage
                      title={title}
                      onMediaDelete={(file) => {
                        if (file.type === MediaType.MAP) {
                          onPreviewDeleted()
                        }
                      }}
                      onTagClick={(newContent) => {
                        setValue('content', `${newContent} `)
                        setFocus('content')
                      }}
                      region={region}
                      onClose={onClose}
                      getFormValues={methods.getValues}
                      isSubmitting={isSubmitting}
                      dirtyFields={normalizedDirtyFields}
                      initialValues={initialValues}
                    />
                  )
                }
                case 'neighborhood': {
                  return (
                    <NeighborhoodStage
                      onChange={onChangeNeighborhood}
                      title={
                        initialValues?.region
                          ? 'Neighborhood'
                          : 'One more step...'
                      }
                      description={
                        initialValues?.region
                          ? null
                          : 'Please select a neighborhood to direct your post'
                      }
                    />
                  )
                }
                case 'group': {
                  return <GroupStage onChange={onChangeGroup} />
                }
              }
            }}
          </PostFormStageContext.Consumer>
        </Form>
      </PostFormStageContextProvider>
    </FormProvider>
  )
}

const Form = styled.form`
  padding: ${FORM_PADDING};

  ${mobileMedia} {
    padding: 16px;
    min-height: 100%;
    min-width: 100%;
  }

  ${notMobileMedia} {
    flex-basis: ${FORM_DESKTOP_FLEX_BASIS};
    min-height: 394px;
    margin: auto;
    border-radius: 12px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08),
      0 3.78px 33.4221px rgba(0, 0, 0, 0.0503198),
      0 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198);
  }

  display: flex;
  flex-direction: column;

  position: relative;

  background: #ffffff;
`

const useInitialValues = (
  initialValuesBase: PostInitialValues,
): PostFormModel => {
  return useMemo(() => {
    if ('media' in initialValuesBase) {
      return {
        ...initialValuesBase,
        media: initialValuesBase.media.map(({ url, type }) => ({
          id: url,
          url,
          type,
        })),
      }
    }
    return {
      ...initialValuesBase,
      content: '',
      media: [],
    }
  }, [initialValuesBase])
}

type Source = {
  id: string
  name: string
}
const useGeoDataPreview = (
  setValue: (
    name: 'media' | 'geoData' | 'regionId' | 'groupId' | 'group' | 'region',
    value: string | Array<Required<FileModel>> | null | Source,
  ) => void,
  geoData: GeocodeFeature,
  regionId: string,
) => {
  const apolloClient = useApolloClient()
  const [geoPointRegionId, setGeoPointRegionId] = useState<string | null>(() =>
    geoData ? regionId : null,
  )

  const handleChangeGeoData = useCallback(
    async (regionId: string, geoData?: GeocodeFeature | null) => {
      if (geoData) {
        const [long, lat] = geoData.geometry.coordinates

        const resultQueryRegionByPoint = await apolloClient.query({
          query: QUERY_GET_REGIONS_BY_POINT,
          variables: {
            point: {
              long,
              lat,
            },
            zoomLevel: MAP_PREVIEW_ZOOM,
          },
        })

        const region =
          resultQueryRegionByPoint.data.getRegionsByPoint?.features[0]

        const newRegionId = (region?.id as string) || null

        if (newRegionId) {
          setGeoPointRegionId(newRegionId)

          if (regionId !== newRegionId) {
            setValue('regionId', newRegionId)
          }
        }
      } else {
        setGeoPointRegionId(null)
      }
    },
    [apolloClient, setValue],
  )

  const onGeoDataChange = useCallback(
    async (geoData: GeocodeFeature) => {
      handleChangeGeoData(regionId, geoData)
    },
    [handleChangeGeoData, regionId],
  )

  const onPreviewDeleted = () => {
    setValue('geoData', null)
    setGeoPointRegionId(null)
  }

  return {
    onGeoDataChange,
    geoPointRegionId,
    onPreviewDeleted,
  }
}
