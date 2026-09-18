/* ============================================================
   ARTHOVISTA — STARTUP INDIA LANDING PAGE
   Interactions: form (real submit — no fake success), analytics,
   FAQ accordion, mobile nav, reveal, year.
============================================================ */
(function () {
  'use strict';

  var CFG = window.ARTHOVISTA_CONFIG || {
    FORM: { ENABLED: false, ENDPOINT: '', METHOD: 'POST' },
    ANALYTICS: { ENABLED: false, track: function () {} }
  };

  function pushGtmLead(service) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "lead_submit", service });
  }

  function track(name, data) {
    if (CFG && CFG.ANALYTICS && CFG.ANALYTICS.ENABLED && typeof CFG.ANALYTICS.track === 'function') {
      CFG.ANALYTICS.track(name, data || {});
    }
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Year ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* ---------- Mobile nav ---------- */
    var navToggle = document.getElementById('navToggle');
    var nav = document.getElementById('nav');
    if (navToggle && nav) {
      navToggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      nav.querySelectorAll('.nav__link').forEach(function (link) {
        link.addEventListener('click', function () {
          nav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* ---------- FAQ accordion (accessible) ---------- */
    document.querySelectorAll('[data-faq]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        btn.parentElement.classList.toggle('open', !isOpen);
        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        if (panel) {
          panel.style.maxHeight = isOpen ? '0px' : panel.scrollHeight + 'px';
        }
        track('faq_interaction', { question: btn.getAttribute('aria-controls') });
      });
    });

    /* ---------- Analytics: CTA & channel clicks ---------- */
    document.querySelectorAll('[data-analytics]').forEach(function (el) {
      var label = el.getAttribute('data-analytics');
      if (label === 'faq') return;
      el.addEventListener('click', function () {
        track(label, { url: el.href || '' });
      });
    });

    /* ---------- Analytics: translate "started" when a form becomes active ---------- */
    ['leadForm', 'contactForm'].forEach(function (formId) {
      var formEl = document.getElementById(formId);
      if (!formEl) return;
      formEl.addEventListener('focusin', function onFocus() {
        formEl.removeEventListener('focusin', onFocus);
        track('form_start', { formId: formId });
      });
    });

    /* ---------- Form handling (real, no fake success) ---------- */
    wireForm('leadForm', 'leadStatus');
    wireForm('contactForm', 'contactStatus');

    function wireForm(formId, statusId) {
      var form = document.getElementById(formId);
      if (!form) return;
      var status = document.getElementById(statusId);
      var submitBtn = form.querySelector('[data-form-submit]');

      function validate(field) {
        var wrap = field.closest('.field');
        var value = field.value.trim();
        var valid = true;

        if (field.required && !value) valid = false;
        else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) valid = false;
        else if (field.type === 'tel' && value.replace(/[\s+\-()]/g, '').length < 10) valid = false;

        if (wrap) wrap.classList.toggle('has-error', !valid);
        return valid;
      }

      function setStatus(type, message, allowRetry) {
        if (!status) return;
        status.hidden = false;
        status.className = 'form-status form-status--' + type;
        var html = message;
        if (allowRetry) {
          html += '<br /><button type="button" class="form-status__btn" data-retry>Try again</button>';
        }
        status.innerHTML = html;
        var retry = status.querySelector('[data-retry]');
        if (retry) {
          retry.addEventListener('click', function () {
            status.hidden = true;
            status.className = 'form-status';
            status.innerHTML = '';
            if (submitBtn) submitBtn.disabled = false;
          });
        }
        status.setAttribute('role', type === 'error' ? 'alert' : 'status');
      }

      form.querySelectorAll('input, select, textarea').forEach(function (f) {
        f.addEventListener('blur', function () { validate(f); });
        f.addEventListener('input', function () {
          var wrap = f.closest('.field');
          if (wrap && wrap.classList.contains('has-error')) validate(f);
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        track('form_submit', { formId: formId });
        var allValid = true;
        form.querySelectorAll('input, select, textarea').forEach(function (f) {
          if (f.required && !validate(f)) allValid = false;
        });
        if (!allValid) {
          setStatus('error', 'Please review the highlighted fields and try again.', false);
          var firstBad = form.querySelector('.field.has-error input, .field.has-error select, .field.has-error textarea');
          if (firstBad) firstBad.focus();
          return;
        }

        var hp = form.querySelector('input[name="website"]');
        if (hp && hp.value) {
          setStatus('success', 'Thank you for your message. We will get back to you.', false);
          form.reset();
          track('form_submit_honeypot', { formId: formId });
          return;
        }

        var payload = {};
        form.querySelectorAll('input, select, textarea').forEach(function (f) {
          if (f.name && f.type !== 'checkbox') payload[f.name] = f.value.trim();
        });

        submitViaApi(formId, payload, submitBtn, setStatus);
      });
    }

    function submitViaApi(formId, payload, submitBtn, setStatus) {
      var cfg = CFG.FORM || {};
      var endpoint = cfg.ENDPOINT || '/api/startup-india/enquiry';

      if (!cfg.ENABLED || !endpoint) {
        setStatus('pinned',
          'This enquiry form is not yet connected to a live inbox, so we cannot receive your message just yet. ' +
          'Please call or WhatsApp us at +91 98999 02568 instead — we are happy to help right away.', false);
        track('form_no_backend', { formId: formId });
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      track('form_send_start', { formId: formId });

      fetch(endpoint, {
        method: cfg.METHOD || 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (body) {
            if (!res.ok) {
              var err = new Error(body && body.message ? body.message : ('HTTP ' + res.status));
              err.status = res.status;
              throw err;
            }
            return body;
          });
        })
        .then(function (body) {
          setStatus('success', 'Thank you! Your enquiry has been received and we will get back to you shortly.', false);
          pushGtmLead('startup_india');
          track('form_success', { formId: formId, id: body && body.id });
          var form = document.getElementById(formId);
          if (form) form.reset();
        })
        .catch(function (err) {
          setStatus('error', 'Sorry, we could not send your message. Please try again, or call/WhatsApp us directly.', true);
          track('form_error', { formId: formId, error: String(err) });
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.getAttribute('data-form-label') || 'Submit';
          }
        });
    }

    /* ---------- Reveal on scroll ---------- */
    var revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length && 'IntersectionObserver' in window) {
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function (el) { revealObs.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('revealed'); });
    }
  });
})();
