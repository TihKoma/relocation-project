import { NODE_DEVELOPMENT } from '@/modules/utils/config'

const PROVIDER_ID = 'M-5412' // constant provided by listhub

export const listhubInitScript = `
(function(l,i,s,t,h,u,b){l['ListHubAnalyticsObject']=h;l[h]=l[h]||function(){
  (l[h].q=l[h].q||[]).push(arguments)},l[h].d=1*new Date();u=i.createElement(s),
  b=i.getElementsByTagName(s)[0];u.async=1;u.src=t;b.parentNode.insertBefore(u,b)
})(window,document,'script','//tracking.listhub.net/la.min.js','lh');

lh('init', {provider:'${PROVIDER_ID}', test:${NODE_DEVELOPMENT}});
`
