import {
  RelocationMarketplaceServiceGroupName,
  RelocationMarketplaceServiceName,
} from '@/modules/relocation-marketplace'

type Route<T> = {
  calcUrl: (values: T) => string
  as: string // route url for next router
}

export type LoginSubscriptionQuery = 'optimal' | 'premium'
export type LoginToQuery =
  | 'where'
  | 'launch-relocation'
  | 'dashboard'
  | 'relocation-concierge'
  | 'back'
  | 'guide'
  | 'manager'
  | 'houses'
  | 'community'

export const ROUTES = {
  root: {
    calcUrl: () => '/',
    as: '/',
  },
  redirect: {
    calcUrl: () => '/redirect',
    as: '/redirect',
  },
  myFeed: {
    calcUrl: () => '/feed',
    as: '/feed',
  },
  homes: {
    calcUrl: () => '/homes',
    as: '/homes',
  },
  payment: {
    calcUrl: ({ redirectTo, withPaymentEvent }) => {
      let url = '/payment'
      if (redirectTo || withPaymentEvent) {
        url += '?'
      }
      if (redirectTo) {
        url += `redirectTo=${redirectTo}&`
      }
      if (withPaymentEvent) {
        url += `withPaymentEvent=${withPaymentEvent}`
      }
      return url
    },
    as: '/payment',
  } as Route<{
    redirectTo?: string
    withPaymentEvent?: boolean
  }>,
  relocationManager: {
    calcUrl: ({ toPlans, paymentRedirectTo }) =>
      `/relocation-manager${
        paymentRedirectTo ? `?paymentRedirectTo=${paymentRedirectTo}` : ''
      }${toPlans ? '#plans' : ''}`,
    as: '/relocation-manager',
  } as Route<{
    toPlans?: boolean
    paymentRedirectTo?: string
  }>,
  login: {
    calcUrl: ({ to, subscription, paymentRedirectTo } = {}) => {
      const query: [string, string][] = []

      if (to) {
        query.push(['to', to])
      }

      if (subscription) {
        query.push(['subscription', subscription])
      }

      if (paymentRedirectTo) {
        query.push(['paymentRedirectTo', paymentRedirectTo])
      }

      return `/login${
        query.length > 0
          ? `?${query.map((item) => item.join('=')).join('&')}`
          : ''
      }`
    },
    as: '/login?q=[to]',
  } as Route<{
    subscription?: LoginSubscriptionQuery
    to?: LoginToQuery
    paymentRedirectTo?: string
  }>,
  publicProfile: {
    calcUrl: ({ userName }) => `/u/${userName}`,
    as: '/u/[userName]',
  } as Route<{ userName: string }>,
  mySettings: {
    calcUrl: () => '/my/settings',
    as: '/my/settings',
  },
  relocationMarketplace: {
    calcUrl: ({ serviceNameCompleted, withBackButton }) => {
      let url = '/relocation'
      if (serviceNameCompleted || withBackButton) {
        url += '?'
      }
      if (serviceNameCompleted) {
        url += `serviceNameCompleted=${serviceNameCompleted}&`
      }
      if (withBackButton) {
        url += `withBackButton=${withBackButton}`
      }
      return url
    },
    as: '/relocation',
  } as Route<{
    serviceNameCompleted?: RelocationMarketplaceServiceName
    withBackButton?: boolean
  }>,
  relocationMarketplaceServiceGroup: {
    calcUrl: ({ serviceGroupName }) => `/relocation/${serviceGroupName}`,
    as: '/relocation/[serviceGroupName]',
  } as Route<{ serviceGroupName: RelocationMarketplaceServiceGroupName }>,
  relocationMarketplaceService: {
    calcUrl: ({ serviceName, serviceGroupName, isWebView }) =>
      `/relocation/${serviceGroupName}/${serviceName}${
        isWebView ? `?isWebView=true` : ''
      }`,
    as: '/relocation/[serviceGroupName]/[serviceName]',
  } as Route<{
    serviceName: RelocationMarketplaceServiceName
    serviceGroupName: RelocationMarketplaceServiceGroupName
    isWebView?: boolean
  }>,
  relocationServiceAbout: {
    calcUrl: ({ serviceName, serviceGroupName }) =>
      `/relocation/${serviceGroupName}/${serviceName}/about`,
    as: '/relocation/[serviceGroupName]/[serviceName]/about',
  } as Route<{
    serviceName: RelocationMarketplaceServiceName
    serviceGroupName: RelocationMarketplaceServiceGroupName
  }>,
  search: {
    calcUrl: ({ query }) => `/search?q=${query}`,
    as: '/search?q=[query]',
  } as Route<{ query: string }>,
  area: {
    calcUrl: ({ regionSlug, quizId }) => {
      let url = `/${regionSlug}`
      if (quizId) {
        url += `?quizId=${quizId}`
      }
      return url
    },
    as: '/[regionSlug]',
  } as Route<{ regionSlug: string; quizId?: string }>,
  areaRealEstate: {
    calcUrl: ({ regionSlug, filters = '' }) => {
      return `/${regionSlug}/homes${filters}`
    },
    as: '/[regionSlug]/homes',
  } as Route<{ regionSlug: string; filters?: string }>,
  areaFeed: {
    calcUrl: ({ regionSlug }) => {
      return `/${regionSlug}/posts`
    },
    as: '/[regionSlug]/posts',
  } as Route<{ regionSlug: string }>,
  areaDetail: {
    calcUrl: ({ regionSlug, quizId }) => {
      let url = `/${regionSlug}/about`
      if (quizId) {
        url += `?quizId=${quizId}`
      }
      return url
    },
    as: '/[regionSlug]/about',
  } as Route<{ regionSlug: string; quizId?: string }>,
  areaWhere: {
    calcUrl: ({ regionSlug, quizId }) => {
      let url = `/${regionSlug}/where`
      if (quizId) {
        url += `?quizId=${quizId}`
      }
      return url
    },
    as: '/[regionSlug]/where',
  } as Route<{ regionSlug: string; quizId?: string }>,
  detailedPost: {
    calcUrl: ({ postSlug }) => `/post/${postSlug}`,
    as: '/post/[postSlug]',
  } as Route<{ postSlug: string }>,
  guide: {
    calcUrl: () => `/guide`,
    as: '/guide',
  },
  guideArticle: {
    calcUrl: ({ guideSlug }) => `/guide/${guideSlug}`,
    as: '/guide/[guideSlug]',
  } as Route<{ guideSlug: string }>,
  listingsGroup: {
    calcUrl: ({ areaSlug, addressSlug }) =>
      `/${areaSlug}/homes/building/${addressSlug}`,
    as: '/[areaSlug]/homes/building/[addressSlug]',
  } as Route<{ areaSlug: string; addressSlug: string }>,
  detailedListing: {
    calcUrl: ({ areaSlug, listingId, address, unit, quizId }) => {
      const quizIdParam = quizId ? `?quizId=${quizId}` : ''

      if (address) {
        const normalize = (address: string) => {
          return address.replaceAll(' ', '-').replaceAll(/[#$]/g, '')
        }

        const encodedAddress = encodeURI(normalize(address))

        if (unit) {
          const encodedUnit = encodeURI(normalize(unit))

          return `/${areaSlug}/homes/${encodedAddress}-${encodedUnit}/${listingId}${quizIdParam}`
        }

        return `/${areaSlug}/homes/${encodedAddress}/${listingId}${quizIdParam}`
      }

      return `/${areaSlug}/homes/${listingId}${quizIdParam}`
    },
    as: '/[areaSlug]/homes/[address]/[listingId]',
  } as Route<{
    listingId: string
    areaSlug: string
    address?: string
    unit?: string | null
    quizId?: string
  }>,
  favorites: {
    calcUrl: () => '/favorites',
    as: '/favorites',
  },
  savedSearches: {
    calcUrl: () => '/u/searches',
    as: '/u/searches',
  },
  quiz: {
    calcUrl: () => `/quiz`,
    as: `/quiz`,
  },
  whereQuiz: {
    calcUrl: () => `/where/quiz`,
    as: '/where/quiz',
  },
  where: {
    calcUrl: () => `/where`,
    as: '/where',
  },
  whereResult: {
    calcUrl: ({ id }) => `/where/result/${id}`,
    as: '/where/result/[id]',
  } as Route<{ id: string }>,
  whereEngine: {
    calcUrl: () => `/where/engine`,
    as: `/where/engine`,
  },
  tagFeed: {
    calcUrl: ({ tag }) => `/tag/${tag}`,
    as: '/tag/[tag]',
  } as Route<{ tag: string }>,
  group: {
    calcUrl: ({ groupSlug }) => `/group/${groupSlug}`,
    as: '/group/[groupSlug]',
  } as Route<{ groupSlug: string }>,
  launchRelocation: {
    calcUrl: ({ from }) => `/launch-relocation${from ? `?from=${from}` : ''}`,
    as: '/launch-relocation',
  } as Route<{
    from?: string
  }>,
  dashboard: {
    calcUrl: () => '/dashboard',
    as: '/dashboard',
  },
  relocationQuiz: {
    calcUrl: () => '/relocation-quiz',
    as: '/relocation-quiz',
  },
}
