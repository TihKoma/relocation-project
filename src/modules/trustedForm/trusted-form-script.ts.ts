import { NODE_DEVELOPMENT } from '@/modules/utils/config'

export const trustedFormScript = `
(function() {
  var sandbox = ${NODE_DEVELOPMENT};
  var tf = document.createElement('script');
  tf.type = 'text/javascript'; tf.async = true;
  tf.src = ("https:" == document.location.protocol ? 'https' : 'http') + "://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&ping_field=xxTrustedFormPingUrl&l=" + new Date().getTime() + Math.random() + '&sandbox=' + sandbox;
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s);
  })();
`
