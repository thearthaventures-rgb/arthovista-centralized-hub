import { h } from '../lib/dom.js';

function trackType(href) {
  if (href.startsWith('tel:')) return 'phone';
  if (href.startsWith('https://wa.me')) return 'whatsapp';
  if (href.startsWith('mailto:')) return 'email';
  if (href.startsWith('http')) return 'website';
  return null;
}

export function Footer({ branding, about, officesLine, columns, bottom }) {
  const year = new Date().getFullYear();
  const rights = bottom.replace('{year}', String(year));
  return h('footer', { class: 'site-footer' }, [
    h('div', { class: 'container' }, [
      h('div', { class: 'footer-grid' }, [
        h('div', { class: 'footer-about' }, [
          h('a', { href: '#top', class: 'brand footer-about__brand', 'aria-label': 'ArthoVista home' }, [
            h('img', { class: 'brand__logo', src: branding.logo, alt: 'ArthoVista logo', width: '46', height: '46' }),
            h('span', { class: 'brand__name', html: branding.nameHtml })
          ]),
          h('p', { class: 'footer-about__text' }, about),
          officesLine ? h('p', { class: 'footer-about__offices' }, officesLine) : null
        ]),
        ...columns.map((col) =>
          h('div', { class: 'footer-col' }, [
            h('h4', { class: 'footer-col__title' }, col.title),
            ...col.links.map((l) => {
              const t = trackType(l.href);
              return h('a', { href: l.href, class: 'footer-col__link', ...(t ? { 'data-contact-action': t } : {}) }, l.label);
            })
          ])
        )
      ]),
      h('div', { class: 'footer-bottom' }, [
        h('span', {}, rights),
        h('span', {}, branding.serviceLabel)
      ])
    ])
  ]);
}

export default Footer;