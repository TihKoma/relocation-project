import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'

type Context = {
  listingId: string
  internalId: string
  propertyType: string
  isContactFormVisible: boolean
  showContactFormModal: (
    listingId: string,
    internalId: string,
    propertyType: string,
  ) => void
  hideContactFormModal: () => void
}

const ContactFormModalContext = createContext<Context>({
  listingId: '',
  internalId: '',
  propertyType: '',
  isContactFormVisible: false,
  showContactFormModal: () => {},
  hideContactFormModal: () => {},
})

type Props = {
  children: ReactNode
}

export const ContactFormModalContextProvider: FC<Props> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [internalId, setInternalId] = useState('')
  const [listingId, setListingId] = useState('')
  const [propertyType, setPropertyType] = useState('')

  const value = useMemo(
    () => ({
      listingId,
      internalId,
      propertyType,
      isContactFormVisible: isVisible,
      showContactFormModal: (
        listingId: string,
        internalId: string,
        propertyType: string,
      ) => {
        setListingId(listingId)
        setIsVisible(true)
        setInternalId(internalId)
        setPropertyType(propertyType)
      },
      hideContactFormModal: () => {
        setIsVisible(false)
      },
    }),
    [isVisible, setIsVisible, listingId, internalId, propertyType],
  )

  return (
    <ContactFormModalContext.Provider value={value}>
      {children}
    </ContactFormModalContext.Provider>
  )
}

export const useContactFormModal = (): Context => {
  return useContext(ContactFormModalContext)
}
