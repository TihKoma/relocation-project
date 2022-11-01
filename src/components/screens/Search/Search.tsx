import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { SearchMeta } from '@/components/screens/Search/SearchMeta'
import { AreaLayout } from '@/components/shared/AreaLayout'
import { SearchBarInput as SearchBarInputBase } from '@/components/shared/layout'
import { DiscoveryCPMap } from '@/components/shared/maps/DiscoveryCPMap'
import { useIsMobileDevice } from '@/modules/device'
import {
  headerChangeMediaSecond,
  mobileMedia,
  notMobileMedia,
} from '@/styles/media'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'
import { getColorTheme } from '@/styles/themes'

import { SearchResult } from './SearchResult/SearchResult'

export const Search: FC = () => {
  const router = useRouter()

  const searchValue = typeof router.query.q === 'string' ? router.query.q : ''

  const isMobile = useIsMobileDevice()
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  return (
    <>
      <SearchMeta query={searchValue} />
      <AreaLayout map={() => <DiscoveryCPMap />}>
        <Container>
          {isMobile && <Header>Search</Header>}
          <SearchBar
            initialValue={searchValue}
            onChangePopupVisibility={setIsPopupVisible}
          />
          {!isPopupVisible && (
            <Wrapper>
              <Inner>
                <SearchResult searchValue={searchValue} />
              </Inner>
            </Wrapper>
          )}
        </Container>
      </AreaLayout>
    </>
  )
}

const Container = styled.div`
  height: 100%;
  min-height: 40rem;

  align-items: start;

  overflow: hidden;

  ${mobileMedia} {
    padding-top: 1.2rem;
  }
  ${notMobileMedia} {
    max-width: max(68.4rem, 50%);
  }
`
const Wrapper = styled.div`
  height: 100%;

  position: relative;
  overflow: hidden;

  border-radius: 1.2rem;
`
const Inner = styled.div`
  height: 100%;

  ${SCROLLBAR_DISPLAY_NONE_MIXIN};
`
const SearchBar = styled(SearchBarInputBase)`
  min-width: 100%;
  z-index: 2;

  justify-self: end;

  padding: 0 1rem;

  ${notMobileMedia} {
    display: none;
  }
  ${headerChangeMediaSecond} {
    max-width: 37.6rem;
  }
`
const Header = styled.div`
  min-width: 100%;
  padding: 0 1rem;

  font-size: 1.8rem;
  color: ${getColorTheme('sun1000')};
`
