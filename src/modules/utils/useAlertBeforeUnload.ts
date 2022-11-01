import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAlertBeforeUnload = (shouldWarn: boolean, message: string) => {
  const router = useRouter()

  useEffect(() => {
    let isWarned = false

    const routeChangeStart = (url: string) => {
      if (shouldWarn && !isWarned) {
        isWarned = true
        if (!window.confirm(message)) {
          isWarned = false
          router.events.emit('routeChangeError')
          // eslint-disable-next-line no-throw-literal
          throw `Route change to ${url} was aborted. This error can be safely ignored.`
        }
      }
    }

    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldWarn && !isWarned) {
        event.returnValue = message
        return message
      }
    }
    router.events.on('routeChangeStart', routeChangeStart)
    window.addEventListener('beforeunload', beforeUnload)

    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      window.removeEventListener('beforeunload', beforeUnload)
    }
  }, [router, message, shouldWarn])
}
