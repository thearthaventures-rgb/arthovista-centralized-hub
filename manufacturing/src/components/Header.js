import { h } from '../lib/dom.js';
import { icon } from './icons.js';
import { track, ANALYTICS_EVENTS } from '../lib/analytics.js';

export function Header({ branding, links, cta, quick = [] }) {
  const navEl = h('header', { class: 'site-header' }, [
    h('div', { class: 'container nav' }, [
      h('a', { href: '#top', class: 'brand', 'aria-label': 'ArthoVista home' }, [
        h('img', { class: 'brand__logo', src: branding.logo, alt: 'ArthoVista logo', width: '46', height: '46' }),
        h('span', { class: 'brand__name', html: branding.nameHtml })
      ]),
      h('nav', { class: 'nav__links', 'aria-label': 'Primary', id: 'navLinks' },
        links.map((l) => h('a', { href: l.href, 'data-nav-link': '1' }, l.label))
      ),
      h('div', { class: 'nav__cta' }, [
        h('div', { class: 'nav__quick', 'aria-label': 'Contact options' },
          quick.map((q) => h('a', { href: q.href, class: 'nav__quick-link', 'data-contact-action': q.track, 'aria-label': q.title, title: q.title }, icon(q.icon, 20, 2)))
        ),
        h('a', { href: cta.href, class: 'btn btn--primary', 'data-cta-anchor': '1' }, cta.label),
        h('button', { class: 'nav__toggle', type: 'button', 'aria-label': 'Toggle menu', 'aria-expanded': 'false', 'aria-controls': 'navLinks' },
          [0, 1, 2].map(() => h('span'))
        )
      ])
    ])
  ]);

  const toggle = navEl.querySelector('.nav__toggle');
  const close = () => {
    navEl.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const open = navEl.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navEl.addEventListener('click', (e) => {
    const link = e.target.closest('[data-nav-link], [data-cta-anchor]');
    if (link) {
      close();
      track(ANALYTICS_EVENTS.navClick, { label: link.getAttribute('href') });
    }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  return navEl;
}

export default Header;