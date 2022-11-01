import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useRef,
  useState,
} from 'react'
import styled from '@emotion/styled'
import { useClickAway } from 'react-use'

import { ChoiceGeoPoint } from '@/components/shared/Location'
import { useCheckRegionForQuiz } from '@/components/shared/Location/features/ChoiceGeoPoint/use-check-region'
import { Input } from '@/components/ui-kit/form/Input'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { TextHighlighter } from '@/components/ui-kit/TextHighlighter'
import { LocationIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { Geocode, GeocodeFeature, GeocodeResponse } from '@/modules/map'
import { NEW_YORK_CENTER_COORDS } from '@/modules/mock'
import { composeRefs } from '@/modules/utils/composeRefs'
import { AVERAGE_TYPING_TIME, useDebounce } from '@/modules/utils/useDebounce'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'

import { PointInput } from '../../../../../../../__generated__/globalTypes'
import { Placeholder } from '../../../shared/Placeholder'
import {
  highlightClassName,
  SubTitle,
  Title,
  titleSelectedAddresses,
} from '../../../shared/shared'

export type Value = GeocodeResponse['geoJson']
export type Props = {
  value?: Value
  onChange: (value: Value) => void
  label: string
  className?: string
  choicePoints: PointInput[]
  setChoicePoints: Dispatch<SetStateAction<PointInput[]>>
}

export const createFeatureCollection = (
  features: Value['features'] = [],
): Value => ({
  type: 'FeatureCollection',
  features,
})
export const mapFeatureCollection =
  (mapFeature: (features: Value['features']) => Value['features']) =>
  (value: Value) => ({
    ...value,
    features: mapFeature(value.features),
  })

export const DropdownBase = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      value: addresses,
      onChange,
      label,
      choicePoints,
      setChoicePoints,
    },
    ref,
  ) => {
    const [value, setValue] = useState('')
    const [isShowList, setIsShowList] = useState(false)
    const containerRef = useRef(null)
    const [isShowModalLocation, setIsShowModalLocation] = useState(false)
    useClickAway(containerRef, () => setIsShowList(false))
    const analytics = useAnalytics()

    const [placesSearch, setPlacesSearch] = useState<Value>(
      createFeatureCollection,
    )
    const searchPlaces = useDebounce(
      (search: string) =>
        Geocode.forward({
          search,
        }).then(({ geoJson }) => checkRegions(geoJson.features)),
      AVERAGE_TYPING_TIME,
    )

    const filterPlacesSearch = ({ id }: Value['features'][number]): boolean =>
      !addresses?.features.map(({ id }) => id).includes(id)
    const filteredPlacesSearch = mapFeatureCollection((features) =>
      features.filter(filterPlacesSearch),
    )(placesSearch)

    const [locationError, checkIsRegion] = useCheckRegionForQuiz()
    const inputRef = useRef<HTMLInputElement>(null)

    const errorMessage = useRef('Nothing was found')
    const tip = useRef('Please try again')

    const checkRegions = async (features: GeocodeFeature[]) => {
      const searchPromises = features.map(async (item) => {
        const [long, lat] = item.geometry.coordinates

        const isRegionChecked = await checkIsRegion([
          ...(choicePoints ?? []),
          { long, lat },
        ])
        return {
          value: item,
          isRegionChecked,
        }
      })
      const searchWithRegionCheck = await Promise.all(searchPromises)
      const isLandmarkFarFromOthers = searchWithRegionCheck.every(
        (region) => !region.isRegionChecked,
      )

      if (isLandmarkFarFromOthers && locationError.split('/').length === 2) {
        errorMessage.current = locationError.split('/')[0]
        tip.current = locationError.split('/')[1]
      } else {
        errorMessage.current = 'Nothing was found'
      }
      const checkedRegions = searchWithRegionCheck
        .filter((region) => region.isRegionChecked)
        .map(({ value }) => value)

      setPlacesSearch(createFeatureCollection(checkedRegions))
    }
    const addPlace = (place: Value['features'][number]) => {
      if (addresses) {
        onChange(
          mapFeatureCollection((features) => [...features, place])(addresses),
        )
      }
    }

    return (
      <Container
        ref={containerRef}
        className={className}
        isShowList={isShowList}
      >
        <Input
          ref={composeRefs([inputRef, ref])}
          label={label}
          value={value}
          onChange={(search) => {
            if (search.length === 1) {
              analytics.addressInputTry({ source: 'quiz' })
            }
            if (search.length > 0) {
              searchPlaces(search)
            }
            setValue(search)
          }}
          onFocus={() => setIsShowList(true)}
          prefix={({ magnifierIcon }) => magnifierIcon}
          suffix={({ crossButton, Button }) =>
            crossButton || (
              <Button onClick={() => setIsShowModalLocation(true)}>
                <LocationIcon />
              </Button>
            )
          }
        />
        <ModalLocation
          isVisible={isShowModalLocation}
          onRequestClose={setIsShowModalLocation}
        >
          <ModalLocationContainer>
            <ChoiceGeoPoint
              locationError={locationError}
              checkIsRegion={checkIsRegion}
              withCheckRegion
              withCloseButton
              filterSearch={filterPlacesSearch}
              title={titleSelectedAddresses}
              onSubmit={(place) => {
                if (place !== null) {
                  const [long, lat] = place.geometry.coordinates
                  setChoicePoints([...choicePoints, { long, lat }])
                  addPlace(place)
                }
              }}
              choicePoints={choicePoints}
              onRequestClose={setIsShowModalLocation}
              regionCenter={[
                NEW_YORK_CENTER_COORDS.lng,
                NEW_YORK_CENTER_COORDS.lat,
              ]}
            />
          </ModalLocationContainer>
        </ModalLocation>
        {isShowList && value && (
          <List>
            {filteredPlacesSearch.features.length > 0 ? (
              filteredPlacesSearch.features
                .slice(0, LIMIT_LOCATIONS)
                .map((place) => {
                  return (
                    <Item
                      key={place.id}
                      onClick={() => {
                        analytics?.addressInputSuccess({ source: 'quiz' })
                        const [long, lat] = place.geometry.coordinates
                        setChoicePoints([...choicePoints, { long, lat }])
                        addPlace(place)
                        setValue('')
                        setIsShowList(false)
                      }}
                    >
                      <Title>
                        <TextHighlighter
                          text={place.properties.title}
                          match={value}
                          highlight={highlightClassName}
                        />
                      </Title>
                      <SubTitle>{place.properties.subTitle}</SubTitle>
                    </Item>
                  )
                })
            ) : (
              <Placeholder
                title={errorMessage.current}
                value={value}
                tip={tip.current}
              />
            )}
          </List>
        )}
      </Container>
    )
  },
)

const LIMIT_LOCATIONS = 5

const Container = styled.div<{ isShowList: boolean }>`
  ${({ isShowList }) => (isShowList ? 'margin-bottom: 20.3rem;' : '')}
  position: relative;
`
const List = styled.ul`
  margin: 0;
  padding: 0.8rem 0;
  max-height: 20.3rem;

  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  overflow-y: auto;

  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08),
    0 3.78px 33.4221px rgba(0, 0, 0, 0.0503198);
  border-radius: 1.2rem;

  ${SCROLLBAR_DISPLAY_NONE_MIXIN}
`
const Item = styled.li`
  padding: 0.8rem 1.6rem;

  transition: background 225ms;

  &:hover {
    background: #f0f1f7;
  }
`
const ModalLocationContainer = styled.div`
  ${notMobileMedia} {
    width: 66.2rem;
    min-height: 61.8rem;
    padding: 2.4rem;
  }
  ${mobileMedia} {
    min-height: 100%;
    min-width: 100%;
    padding: 1.6rem;

    display: flex;
    flex-direction: column;
  }
  position: relative;

  background: #ffffff;
  border-radius: 1.6rem;
`
const ModalLocation = styled(ModalPortal)`
  ${mobileMedia} {
    background: white;
  }
`
