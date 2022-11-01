import { useEffect, useState } from 'react'

import { CountryCode, fetchCountryCodesList } from '@/modules/authorization'

// TODO: use gql to fetch country codes https://nicity.atlassian.net/browse/CP-1646
export const useCountryCodes = () => {
  const LOCAL_STORAGE_KEY = 'country-codes'

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [countryCodes, setCountryCodes] = useState<CountryCode[] | null>(null)

  useEffect(() => {
    const items = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (items) {
      setCountryCodes(JSON.parse(items))
      return
    }
    setLoading(true)
    fetchCountryCodesList()
      .then((data) => {
        setCountryCodes(data)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
      })
      .catch((error) => {
        setError(error ?? 'error')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    loading,
    error,
    countryCodes,
  }
}
