import { WITH_ANALYTICS } from '@/modules/utils/config'

const googleTagManagerScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MPC6D5S');`

const googleTagManagerNoscriptSrc =
  'https://www.googletagmanager.com/ns.html?id=GTM-MPC6D5S'

const GTMHead = () =>
  WITH_ANALYTICS ? (
    <script dangerouslySetInnerHTML={{ __html: googleTagManagerScript }} />
  ) : null

const GTMBody = () =>
  WITH_ANALYTICS ? (
    <noscript>
      <iframe
        title={'gtm'}
        src={googleTagManagerNoscriptSrc}
        height={0}
        width={0}
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  ) : null

export const GoogleTagManager = {
  GTMBody,
  GTMHead,
}
