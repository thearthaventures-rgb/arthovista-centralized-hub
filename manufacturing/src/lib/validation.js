const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_RE = /^[+]?[\d\s()\-.]{10,15}$/;

export function validateEnquiry(payload) {
  const errors = {};
  const required = ['name', 'mobile', 'email', 'company', 'biztype'];

  required.forEach((k) => {
    const v = (payload[k] || '').trim();
    if (!v) errors[k] = 'This field is required.';
    else if (k === 'email' && !EMAIL_RE.test(v)) errors.email = 'Please enter a valid email address.';
    else if (k === 'mobile' && !MOBILE_RE.test(v)) errors.mobile = 'Please enter a valid mobile number.';
  });
  if (payload.name && payload.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (payload.company && payload.company.trim().length < 2) errors.company = 'Please enter your company name.';
  return errors;
}