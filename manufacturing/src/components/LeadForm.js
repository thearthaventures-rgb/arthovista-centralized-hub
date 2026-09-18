function pushGtmLead(service) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "lead_submit", service });
}

import { h, clear } from '../lib/dom.js';
import { track, ANALYTICS_EVENTS } from '../lib/analytics.js';
import { postEnquiry } from '../lib/api.js';
import { validateEnquiry } from '../lib/validation.js';

const SESSION_RATE_LIMIT = 3;   // max submissions per session before requiring delay
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 min

export function LeadForm({ fields, submitLabel, note }) {
  const statusEl = h('div', { class: 'form__status', role: 'status', 'aria-live': 'polite' });
  const submitBtn = h('button', { type: 'submit', class: 'btn btn--primary btn--lg', 'data-cta-anchor': 'form-submit' }, submitLabel);

  const form = h('form', { class: 'form', novalidate: '', 'data-form': 'enquiry' });

  // Honeypot field (hidden from users, bots fill it)
  const hp = h('input', { type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off', class: 'hp-field', 'aria-hidden': 'true' });

  for (const [name, cfg] of Object.entries(fields)) {
    const describedBy = `field-${name}-error`;
    let control;
    if (cfg.type === 'select') {
      control = h('select', { id: `field-${name}`, name, class: 'field__input', 'aria-describedby': describedBy },
        cfg.options.map((o) => h('option', { value: o, ...(o ? {} : { selected: 'selected', disabled: 'disabled' }) }, o || `Select ${name.replace(name[0], name[0].toUpperCase())}...`))
      );
    } else if (cfg.type === 'textarea') {
      control = h('textarea', { id: `field-${name}`, name, class: 'field__input', rows: 4, 'aria-describedby': describedBy, ...(cfg.autocomplete ? { autocomplete: cfg.autocomplete } : {}) });
    } else {
      control = h('input', {
        id: `field-${name}`, name, type: cfg.type, class: 'field__input', 'aria-describedby': describedBy,
        ...(cfg.autocomplete ? { autocomplete: cfg.autocomplete } : {}),
        ...(cfg.required ? { required: '' } : {})
      });
    }
    const err = h('span', { class: 'field__error', id: `field-${name}-error`, role: 'alert' }, '');
    const fieldEl = h('div', { class: `field${name === 'message' ? ' field--full' : ''}` }, [
      h('label', { class: 'field__label', for: `field-${name}` }, cfg.label),
      control,
      err
    ]);
    form.appendChild(fieldEl);
  }

  form.appendChild(hp);
  form.appendChild(h('div', { class: 'form__actions' }, [submitBtn]));
  form.appendChild(h('p', { class: 'form__note' }, note));

  const wrap = h('div', { class: 'form-wrap' }, [form, statusEl]);

  // Track form start (first interaction with any field)
  form.addEventListener('focusin', () => track(ANALYTICS_EVENTS.formStart), { once: true });

  // Clear inline errors as the user corrects a field
  form.addEventListener('input', (e) => {
    const input = e.target.classList && e.target.classList.contains('field__input--invalid') ? e.target : null;
    if (input) {
      input.classList.remove('field__input--invalid');
      input.removeAttribute('aria-invalid');
    }
  });

  let lastSubmitTs = 0;
  function isRateLimited() {
    const now = Date.now();
    if (now - lastSubmitTs < 30000) return true; // <30s backoff
    if (sessionStorage.getItem('enqCount') >= SESSION_RATE_LIMIT) return true;
    return false;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    track(ANALYTICS_EVENTS.formSubmit);

    // Honeypot: silently accept but do nothing for bots
    if (data.get('website')) return;

    if (isRateLimited()) {
      showStatus(statusEl, 'Too many attempts. Please wait a moment and try again.', 'error');
      track(ANALYTICS_EVENTS.formError, { reason: 'rate_limited' });
      return;
    }

    const payload = Object.fromEntries(data.entries());
    delete payload.website;

    const errors = validateEnquiry(payload);
    if (Object.keys(errors).length) {
      for (const [name, msg] of Object.entries(errors)) {
        const input = form.querySelector(`[name="${name}"]`);
        if (input) {
          input.classList.add('field__input--invalid');
          input.setAttribute('aria-invalid', 'true');
          const errEl = form.querySelector(`#field-${name}-error`);
          if (errEl) errEl.textContent = msg;
        }
      }
      showStatus(statusEl, 'Please correct the highlighted fields.', 'error');
      track(ANALYTICS_EVENTS.formError, { reason: 'validation' });
      return;
    }

    submitBtn.disabled = true;
    showStatus(statusEl, 'Submitting your enquiry…', 'pending');

    const res = await postEnquiry(payload);
    submitBtn.disabled = false;
    lastSubmitTs = Date.now();

    if (res.ok) {
      showStatus(statusEl, 'Thank you — your enquiry has been received. We will get back to you shortly.', 'success');
      pushGtmLead("manufacturing");
      track(ANALYTICS_EVENTS.formSuccess);
      form.reset();
    } else if (res.unavailable) {
      showStatus(statusEl, 'Our enquiry service is not fully configured yet. Please reach us directly using the contact details on this page.', 'error');
      track(ANALYTICS_EVENTS.formError, { reason: 'unconfigured' });
    } else {
      showStatus(statusEl, res.message || 'Something went wrong. Please try again or contact us directly.', 'error');
      track(ANALYTICS_EVENTS.formError, { reason: 'server' });
    }
  });

  return wrap;
}

function showStatus(el, msg, kind) {
  el.className = `form__status form__status--${kind}`;
  el.textContent = msg;
}

export default LeadForm;