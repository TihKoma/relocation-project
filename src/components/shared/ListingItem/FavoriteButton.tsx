import { FC } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'

import { showInfoToast } from '@/components/shared/Toast'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { FavoriteEmptyIcon, FavoriteFillIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { useAuthGlobalModals } from '@/modules/authorization'
import {
  MUTATION_SET_LISTING_FAVORITE,
  QUERY_GET_FAVORITE_TOTAL_LISTINGS,
} from '@/modules/listing'
import { ROUTES } from '@/modules/router'

type Props = {
  id: string
  isSelected: boolean
  onClick?: (value: boolean) => void
  className?: string
}
export const FavoriteButton: FC<Props> = ({
  id,
  className,
  isSelected,
  onClick,
}) => {
  const [isNotHavePermission, showModal] = useAuthGlobalModals('reaction')
  const [setListingFavorite] = useMutation(MUTATION_SET_LISTING_FAVORITE)
  const router = useRouter()
  const analytics = useAnalytics()

  return (
    <Container
      className={className}
      onClick={async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (isNotHavePermission) {
          showModal()
          return
        }

        const newValue = !isSelected

        await setListingFavorite({
          variables: {
            id,
            isFavorite: newValue,
          },
          refetchQueries: [QUERY_GET_FAVORITE_TOTAL_LISTINGS],
          update: (cache) => {
            cache.modify({
              id: cache.identify({ id, __typename: 'OverviewListing' }),
              fields: {
                isFavorite: () => newValue,
              },
            })
            cache.modify({
              id: cache.identify({ id, __typename: 'DetailedListing' }),
              fields: {
                isFavorite: () => newValue,
              },
            })
          },
        })
        onClick?.(newValue)
        if (newValue) {
          analytics.MPFavoritesListingAdded()
          showInfoToast('Object added to Favorite Real Estate', {
            autoClose: 3000,
            onClick: () => {
              router.push(ROUTES.favorites.calcUrl(), undefined, {
                shallow: true,
              })
            },
          })
        } else {
          analytics.MPFavoritesListingRemoved()
        }
      }}
    >
      <Icon>{isSelected ? <FavoriteFillIcon /> : <FavoriteEmptyIcon />}</Icon>
    </Container>
  )
}

const Container = styled(NormalizedButton)`
  width: 4rem;
  height: 4rem;

  background: rgba(255, 255, 255, 0.8);
  border-radius: 40px;
`

const Icon = styled.div`
  height: 2rem;
`
