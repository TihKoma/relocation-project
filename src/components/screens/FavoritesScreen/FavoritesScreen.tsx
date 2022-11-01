import styled from '@emotion/styled'

import { FiltersPanel as FiltersPanelBase } from '@/components/screens/FavoritesScreen/FiltersPanel'
import { ListingsList } from '@/components/screens/FavoritesScreen/ListingsList'
import { AreaLayout } from '@/components/shared/AreaLayout'
import { FavoritesMap } from '@/components/shared/maps/FavoritesMap/FavoritesMap'
import { useIsMobileDevice } from '@/modules/device'
import { mobileMedia, notMobileMedia } from '@/styles/media'

import { FavoritesMeta } from './FavoritesMeta'

export const FavoritesScreen = () => {
  const isMobile = useIsMobileDevice()

  return (
    <>
      <FavoritesMeta />
      <AreaLayout
        theme={isMobile ? 'light' : 'dark'}
        map={() => <FavoritesMap />}
        subHeaderTitle={isMobile ? '' : 'Favorites Real Estate'}
        onRequestBack={() => window.history.back()}
      >
        <Container>
          <FiltersPanel />
          <ListingsList />
        </Container>
      </AreaLayout>
    </>
  )
}

const Container = styled.div`
  padding: 0;
  height: 100%;

  position: relative;

  display: flex;
  flex-direction: column;

  ${notMobileMedia} {
    padding-top: 1.6rem;
  }

  ${mobileMedia} {
    padding-top: 2.4rem;

    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`
const FiltersPanel = styled(FiltersPanelBase)`
  margin-bottom: 1.6rem;
  padding: 0 1.6rem;
`
