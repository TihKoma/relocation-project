import { FC, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'

import { StickyBehavior, useFiltersSticky } from '@/components/shared/filters'
import { OrderFilter as OrderFilterBase } from '@/components/shared/filters/OrderFilter'
import { TransactionTypeFilter } from '@/components/shared/filters/TransactionTypeFilter'
import { showInfoToast } from '@/components/shared/Toast'
import { Button as ButtonBase } from '@/components/ui-kit/Button'
import { useAuthorizationStore } from '@/modules/authorization'
import { useIsDesktopDevice } from '@/modules/device'
import { SAVE_LISTINGS_SEARCH } from '@/modules/listing/graphql/mutations'
import { usePropertyFilter } from '@/modules/marketplace'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import {
  ContactScreen,
  EnterContactsModal,
} from '../../SavedSearchesScreen/EnterContacts/EnterContactsModal'
import { AllFiltersButton } from './components/AllFiltersButton'

type Props = {
  regionId: string
  className?: string
}

export const QuickFiltersPanel: FC<Props> = ({ regionId, className }) => {
  const isDesktopDevice = useIsDesktopDevice()
  const { isFixed, scrollElementRef, targetElementRef } = useFiltersSticky()

  const { filter } = usePropertyFilter()
  const [isSearchSaved, setIsSearchSaved] = useState(false)

  const router = useRouter()
  const regionSlug = router.query.regionSlug as string

  const [isContactsModalVisible, setIsContactsModalVisible] = useState(false)
  const [defaultScreen, setDefaultScreen] = useState<ContactScreen>('none')

  const [addSearch] = useMutation(SAVE_LISTINGS_SEARCH)

  const [{ isLoggedIn }] = useAuthorizationStore()

  const onSaveSearchClick = () => {
    if (!isLoggedIn) {
      setIsContactsModalVisible(true)
      setDefaultScreen('phone-enter')
    } else {
      saveSearch()
    }
  }

  const saveSearch = async () => {
    const result = await addSearch({
      variables: {
        regionId,
        query: { ...filter, regionSlug },
      },
    })

    const responseStatus = !!result.data?.saveListingsSearch?.status
    setIsSearchSaved(responseStatus)
    if (responseStatus)
      showInfoToast('Search added to Saved Searches', {
        autoClose: 3000,
        onClick: () => {
          router.push(ROUTES.savedSearches.calcUrl(), undefined, {
            shallow: true,
          })
        },
      })
  }

  useEffect(() => {
    setIsSearchSaved(false)
  }, [filter])

  const onRequestClose = useCallback(
    (isSuccessAuth?: boolean) => {
      setIsContactsModalVisible(false)
      setDefaultScreen('none')

      if (isSuccessAuth) {
        window.location.reload()
      }
    },
    [setIsContactsModalVisible, setDefaultScreen],
  )

  const content = (
    <Container className={className} ref={targetElementRef}>
      <OrderFilter isOnlyIcon={!isDesktopDevice} />
      <TransactionTypeFilter />
      <AllFiltersButton isOnlyIcon={!isDesktopDevice} />
      <Button
        viewType={isSearchSaved ? 'secondary' : 'ghost'}
        size={'small'}
        onClick={onSaveSearchClick}
        disabled={isSearchSaved}
      >
        {isSearchSaved ? 'Search Saved' : 'Save Search'}
      </Button>
    </Container>
  )

  return (
    <>
      {isContactsModalVisible && (
        <EnterContactsModal
          onSuccessAuth={saveSearch}
          defaultScreen={defaultScreen}
          onRequestClose={onRequestClose}
        />
      )}
      {content}
      {isFixed && scrollElementRef.current
        ? createPortal(
            <StickyBehavior>{content}</StickyBehavior>,
            scrollElementRef.current,
          )
        : null}
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 0.8rem;
  justify-content: start;

  margin-bottom: 1.6rem;

  ${mobileMedia} {
    background-color: ${getColorTheme('earth')};
  }
`
const OrderFilter = styled(OrderFilterBase)`
  margin-left: 1.5rem;
`
const Button = styled(ButtonBase)`
  &: disabled {
    background-color: inherit;
  }
`
// const ScrollArea = styled.div`
//   padding-bottom: 1.6rem; // For box-shadow
//   padding-right: 1.5rem;

//   display: grid;
//   grid-auto-flow: column;
//   grid-column-gap: 0.8rem;

//   overflow-x: auto;
//   ${SCROLLBAR_DISPLAY_NONE_MIXIN}
// `
