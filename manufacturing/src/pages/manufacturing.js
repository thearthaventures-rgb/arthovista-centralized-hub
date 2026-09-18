/* Manufacturing page assembly — composes the page from reusable
   components + the single content file. Future ArthoVista service pages
   follow the same template with their own content source.
   ------------------------------------------------------------------
   Information architecture (§11 of redesign brief):
   Hero → Trust strip → Pain points → Lifecycle → Services → Who we
   support → Schemes → Process → Why → Documentation → FAQ → Conversion
   CTA → Contact form → Footer. */

import { h } from '../lib/dom.js';
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { Section } from '../components/Section.js';
import { Hero, BannerCTA, FAQAccordion } from '../components/sections.js';
import { TrustBar, ChallengeItem, Lifecycle, AudienceDuo, SchemeRow, SchemeNote, ContactInfo } from '../components/blocks.js';
import { ServiceCard, IndustryCard, BenefitCard, DocCard, wireServiceCta } from '../components/cards.js';
import { icon } from '../components/icons.js';
import { LeadForm } from '../components/LeadForm.js';
import { initScrollDepth, track, ANALYTICS_EVENTS } from '../lib/analytics.js';
import { initReveal } from '../lib/reveal.js';
import {
  site, nav, hero, trustBar, challenges, lifecycle, services, audience,
  schemes, why, documentation, faq, contact, ctaBand, footer
} from '../data/manufacturing.js';

export function mountManufacturingPage(root) {
  root.innerHTML = '';

  // CTA tracking (event delegation) — hero + banner + service-link anchors.
  root.addEventListener('click', (e) => {
    const a = e.target.closest('[data-cta-anchor]');
    if (a) {
      const key = a.getAttribute('data-cta-anchor');
      if (key.startsWith('hero') || key === 'banner' || key === 'band') {
        track(ANALYTICS_EVENTS.heroCta, { label: key });
      } else if (key === 'form-submit') {
        /* handled in LeadForm — ignore duplicate */
      }
    }
  });

  // Direct-contact tracking (phone / WhatsApp / email / website) — header,
  // contact panel and footer links all carry [data-contact-action].
  root.addEventListener('click', (e) => {
    const el = e.target.closest('[data-contact-action]');
    if (el) {
      const action = el.getAttribute('data-contact-action');
      const event = action === 'phone' ? ANALYTICS_EVENTS.phoneClick
        : action === 'whatsapp' ? ANALYTICS_EVENTS.whatsappClick
          : 'contact_click';
      track(event, { action });
    }
  });

  root.appendChild(Header({
    branding: site.branding,
    links: nav.links,
    cta: nav.cta,
    quick: [
      { icon: 'phone', href: site.phoneHref, track: 'phone', title: 'Call ArthoVista' },
      { icon: 'whatsapp', href: site.whatsapp, track: 'whatsapp', title: 'WhatsApp ArthoVista' }
    ]
  }));

  // 1. Hero + 2. Trust strip
  root.appendChild(
    Section({
      className: '',
      children: [
        Hero({ data: hero, branding: site.branding }),
        TrustBar({ label: trustBar.label, items: trustBar.items })
      ]
    })
  );

  // 3. Pain points — problem → consequence framing
  root.appendChild(Section({
    id: 'challenges',
    tone: 'alt',
    kicker: challenges.kicker,
    title: challenges.title,
    lead: challenges.lead,
    children: hGrid(challenges.items.map((c, i) => ChallengeItem({ num: i + 1, ...c })), 2)
  }));

  // 4. Manufacturing lifecycle — the connected solution narrative
  root.appendChild(Section({
    id: 'lifecycle',
    kicker: lifecycle.kicker,
    title: lifecycle.title,
    lead: lifecycle.lead,
    children: Lifecycle({ steps: lifecycle.steps })
  }));

  // 5. Services — 5 core + supporting capabilities
  root.appendChild(Section({
    id: 'services',
    kicker: services.kicker,
    title: services.title,
    lead: services.lead,
    children: [
      hWrapper(services.cards.map((c) => ServiceCard(c)), 'service-grid'),
      hSupportStrip(services.support),
      hCtaStrip(services.cta)
    ]
  }));
  wireServiceCta();

  // 6. Who we support — audience + starting-vs-growing distinction
  root.appendChild(Section({
    id: 'audience',
    tone: 'alt',
    kicker: audience.kicker,
    title: audience.title,
    lead: audience.lead,
    children: [
      hGrid(audience.items.map((a) => IndustryCard(a)), 3),
      AudienceDuo({ start: audience.duo.start, grow: audience.duo.grow })
    ]
  }));

  // 7. Government funding & schemes — qualified language
  root.appendChild(Section({
    id: 'schemes',
    kicker: schemes.kicker,
    title: schemes.title,
    lead: schemes.lead,
    children: [
      ...schemes.rows.map((r) => SchemeRow(r)),
      SchemeNote({ text: schemes.note })
    ]
  }));

  // 8. Why ArthoVista — evidence-oriented
  root.appendChild(Section({
    id: 'why',
    kicker: why.kicker,
    title: why.title,
    lead: why.lead,
    children: hGrid(why.items.map((b) => BenefitCard(b)), 2)
  }));

  // 10. Documentation & compliance
  root.appendChild(Section({
    id: 'documentation',
    tone: 'alt',
    kicker: documentation.kicker,
    title: documentation.title,
    lead: documentation.lead,
    children: [
      hGrid(documentation.items.map((d) => DocCard(d)), 3),
      hDocNote(documentation.note)
    ]
  }));

  // 11. FAQ
  root.appendChild(Section({
    id: 'faq',
    kicker: faq.kicker,
    title: faq.title,
    children: h('div', { class: 'container' }, [FAQAccordion({ items: faq.items })])
  }));

  // 12. Conversion CTA
  root.appendChild(Section({
    className: 'section section--banner',
    children: [h('div', { class: 'container' }, [BannerCTA({ title: ctaBand.title, text: ctaBand.text, cta: ctaBand.cta })])]
  }));

  // 13. Contact form + direct contact panel
  root.appendChild(Section({
    id: 'contact',
    tone: 'alt',
    kicker: contact.kicker,
    title: contact.title,
    lead: contact.lead,
    children: h('div', { class: 'container contact-grid' }, [
      LeadForm({ fields: contact.fields, submitLabel: contact.submitLabel, note: contact.note }),
      ContactInfo({ info: contact.info })
    ])
  }));

  // 14. Footer
  root.appendChild(Footer({
    branding: site.branding,
    about: footer.about,
    officesLine: footer.officesLine,
    columns: footer.columns,
    bottom: footer.bottom
  }));

  initReveal();
  initScrollDepth((depth) => track('scroll_depth', { depth }));
}

export default mountManufacturingPage;

/* ---------- small helpers ---------- */
function hGrid(items, cols) {
  return h('div', { class: `grid grid--${cols}` }, items);
}
function hWrapper(items, extraClass) {
  return h('div', { class: extraClass }, items);
}
function hSupportStrip({ label, note, items }) {
  return h('div', { class: 'service-support reveal' }, [
    h('div', { class: 'service-support__head' }, [
      h('h3', { class: 'service-support__label' }, label),
      h('p', { class: 'service-support__note' }, note)
    ]),
    h('ul', { class: 'service-support__items' },
      items.map((item) => h('li', { class: 'service-support__item' }, [icon('plus', 14, 2.5), item]))
    )
  ]);
}
function hDocNote(note) {
  return h('div', { class: 'doc-note reveal' }, [
    h('p', { html: `<strong>Note:</strong> ${note}` })
  ]);
}
function hCtaStrip({ note, href, label }) {
  return h('div', { class: 'services-cta' }, [
    h('p', {}, note),
    h('a', { href, class: 'btn btn--primary', 'data-cta-anchor': 'services-strip' }, label)
  ]);
}