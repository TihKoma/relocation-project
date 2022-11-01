import { useEffect } from 'react'

// Users go back from results page. We want to return them back from quiz
export const useAdhocDisableBackButton = () => {
  useEffect(() => {
    window.history.forward()
  }, [])
}
