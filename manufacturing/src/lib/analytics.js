/* Configurable analytics.
   VITE_GA_MEASUREMENT_ID unset  -> all calls are safe no-ops.
   Set -> pushes dataLayer / gtag events. */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

function ga(...args) {
  if (!GA_ID) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
  if (typeof window.gtag === 'function') window.gtag(...args);
}

if (GA_ID && !window.__avGaLib) {
  window.__avGaLib = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
}

export const track = (event, params = {}) => ga('event', event, params);

export const ANALYTICS_EVENTS = {
  heroCta: 'hero_cta_click',
  serviceCta: 'service_cta_click',
  formStart: 'form_start',
  formSubmit: 'form_submit',
  formSuccess: 'form_success',
  formError: 'form_error',
  phoneClick: 'phone_click',
  whatsappClick: 'whatsapp_click',
  faqOpen: 'faq_open',
  navClick: 'nav_click'
};

/* Scroll depth tracking (25/50/75/100%). */
export function initScrollDepth(onDepth = () => {}) {
  if (!GA_ID) return;
  let fired = new Set();
  const marks = [25, 50, 75, 100];
  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const pct = Math.round((window.scrollY / max) * 100);
    marks.forEach((m) => {
      if (!fired.has(m) && pct >= m) {
        fired.add(m);
        onDepth(m);
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}