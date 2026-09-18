/* ============================================================
   ARTHOVISTA — MANUFACTURING PAGE CONTENT
   ------------------------------------------------------------------
   SINGLE EDITABLE SOURCE. Update copy here; layout lives in
   components. Factual claims below come from ArthoVista's company
   profile and marketing materials (FY 2024–25). Where a metric or
   scheme fact cannot be defended precisely, it is stated in
   qualified language or omitted — never fabricated.
   ============================================================ */

export const site = {
  phone: '+91 98999 02568',
  phoneHref: 'tel:+919899902568',
  whatsapp: 'https://wa.me/919899902568',
  email: 'support@arthovista.com',
  emailHref: 'mailto:support@arthovista.com',
  website: 'arthovistaservices.sbs',
  websiteHref: 'https://arthovistaservices.sbs',
  offices: [
    { city: 'Noida', area: 'Sector 62', tag: 'Corporate HQ' },
    { city: 'New Delhi', area: '', tag: 'Policy & Regulatory' },
    { city: 'Lucknow', area: '', tag: 'UP Enterprise Access' },
    { city: 'Indore', area: '', tag: 'Central India Manufacturing' },
    { city: 'Amravati', area: '', tag: 'Maharashtra Industrial Zone' }
  ],
  branding: {
    logo: './logo.svg',
    nameHtml: 'Artho<em>Vista</em>',
    serviceLabel: 'Manufacturing Companies'
  }
};

export const nav = {
  links: [
    { href: '/', label: '← All Services' },
    { href: '#services', label: 'Services' },
    { href: '#challenges', label: 'Challenges' },
    { href: '#schemes', label: 'Schemes' },
    { href: '#faq', label: 'FAQ' }
  ],
  cta: { href: '#contact', label: 'Book a Free Diagnostic' }
};

export const hero = {
  badge: 'Manufacturing Business Advisory & Execution',
  title: {
    pre: 'Build. Fund. Comply. Scale.',
    hl: 'We take care of the business side of manufacturing.',
    post: ''
  },
  lead: 'ArthoVista is an execution-led partner for manufacturing businesses — company setup, registrations, government funding and subsidies, compliance, certifications, documentation and advisory. We handle the filing, liaisoning and follow-up, not just the advice.',
  ctaPrimary: { href: '#contact', label: 'Book a Free 30-Minute Diagnostic' },
  ctaSecondary: { href: '#services', label: 'Explore Our Services' },
  trust: ['Setup', 'Funding', 'Compliance', 'Documentation'],
  trustLine: 'Execution-led support for the business side of manufacturing.',
  card: {
    title: 'Manufacturing Companies',
    subtitle: 'Setup · Funding · Compliance · Documentation · Advisory',
    stats: [
      { num: '₹108Cr+', label: 'Government capital facilitated' },
      { num: '500+', label: 'Enterprises served nationwide' },
      { num: '5+', label: 'Years of execution' },
      { num: '30-Min', label: 'Free first diagnostic' }
    ]
  }
};

export const trustBar = {
  label: 'Why manufacturers engage ArthoVista',
  items: [
    'One partner from setup to scale',
    'Funding, subsidies & scheme navigation',
    'Compliance, certifications & documentation',
    'Filing, liaisoning and follow-up — done'
  ]
};

export const challenges = {
  kicker: 'The Real Picture',
  title: ['Manufacturing businesses face ', 'real, compounding challenges', ''],
  lead: 'Growth often stalls on the non-production side of the business. Recognise your situation here — then see how we clear these hurdles.',
  items: [
    {
      title: 'Funding gets stuck',
      text: 'Working-capital cycles, machinery investment and delayed receivables restrict growth — and capital subsidy schemes are too often left on the table.'
    },
    {
      title: 'Scheme complexity',
      text: 'Eligibility, documentation and changing scheme requirements make applications difficult to navigate — and missed windows close quietly.'
    },
    {
      title: 'Compliance becomes fragmented',
      text: 'GST, ROC, factory, environmental and labour requirements create an expanding administrative burden that is easy to get wrong.'
    },
    {
      title: 'Documentation slows decisions',
      text: 'Incomplete or inconsistent records delay applications, reviews and financing conversations at exactly the moment momentum matters most.'
    }
  ]
};

/* The manufacturing lifecycle — narrative section (§04).
   START → STRUCTURE → FUND → COMPLY → DOCUMENT → SCALE */
export const lifecycle = {
  kicker: 'How We Think',
  title: ['One partner for the full ', 'manufacturing journey', ''],
  lead: 'We think in terms of the whole business, not single tasks. Every engagement maps into a connected progression across the manufacturing lifecycle.',
  steps: [
    {
      phase: 'START',
      title: 'Entity setup',
      text: 'The right legal structure, registrations and licences to stand up your unit.'
    },
    {
      phase: 'STRUCTURE',
      title: 'Requirements',
      text: 'Registrations, scheme fit and documentation mapped to your sector and stage.'
    },
    {
      phase: 'FUND',
      title: 'Funding & subsidies',
      text: 'Eligible subsidies, incentives and working-capital lines identified and applied for.'
    },
    {
      phase: 'COMPLY',
      title: 'Compliance & filings',
      text: 'Statutory filings and certifications kept current and review-ready.'
    },
    {
      phase: 'DOCUMENT',
      title: 'Documentation & DPR',
      text: 'DPRs, investor-grade materials and records prepared to institutional standards.'
    },
    {
      phase: 'SCALE',
      title: 'Growth & expansion',
      text: 'Structure, advisory and liaisoning to fund and execute the next stage.'
    }
  ]
};

/* Services — core manufacturing support + supporting capabilities. */
export const services = {
  kicker: 'What We Do',
  title: ['Everything your plant needs, ', 'in one place', ''],
  lead: 'Five core manufacturing services carry the page. Each one is execution-led: we prepare, we file, we follow up.',
  cards: [
    {
      icon: 'file',
      iconTone: 'orange',
      index: '01',
      role: 'Core',
      title: 'Setup & Registrations',
      text: 'Stand up a compliant, fundable manufacturing entity from day one — structure, registrations and licences handled end to end.',
      bullets: [
        'Incorporation — Pvt Ltd, LLP, OPC, partnership (MCA21)',
        'DIN, DSC, MOA/AOA, name approval & ROC filings',
        'MSME/Udyam, IEC, Shop & Establishment, Startup India (DPIIT)'
      ],
      cta: { href: '#contact', label: 'Plan Your Setup' },
      placeholder: false
    },
    {
      icon: 'rupee',
      iconTone: 'blue',
      index: '02',
      role: 'Core',
      title: 'Funding & Subsidies',
      text: 'Identify eligible credit-linked subsidies, government incentives and financing pathways aligned to your investment or expansion plans.',
      bullets: [
        'Eligibility mapping & scheme identification',
        'Application preparation & submission',
        'Liaisoning, follow-up & sanction-to-disbursement support'
      ],
      cta: { href: '#contact', label: 'Explore Funding Support' },
      placeholder: false
    },
    {
      icon: 'shield',
      iconTone: 'green',
      index: '03',
      role: 'Core',
      title: 'Compliance & Certifications',
      text: 'A structured compliance picture for your unit — statutory filings, licences and certifications, kept current and review-ready.',
      bullets: [
        'GST, income tax & statutory return coordination',
        'ROC filings, director KYC & audit coordination',
        'ZED, ISO & DUNS certification pathway support'
      ],
      cta: { href: '#contact', label: 'Review Compliance Needs' },
      placeholder: false
    },
    {
      icon: 'chart',
      iconTone: 'orange',
      index: '04',
      role: 'Core',
      title: 'DPR & Documentation',
      text: 'Bankable DPRs, investor-grade materials and clean records — documentation prepared to institutional standards so reviews move faster.',
      bullets: [
        'Detailed Project Reports (DPR) for banks & authorities',
        'Pitch decks, financial models & business valuation',
        'Lender & investor documentation, audit-ready records'
      ],
      cta: { href: '#contact', label: 'Discuss Your Documentation' },
      placeholder: false
    },
    {
      icon: 'layers',
      iconTone: 'blue',
      index: '05',
      role: 'Core',
      title: 'Business & Financial Advisory',
      text: 'Feasibility, financial advisory and growth structuring that de-risk decisions on the business side of manufacturing.',
      bullets: [
        'Business model validation & feasibility studies',
        'Market research & financial advisory',
        'Growth structuring, expansion & land-access guidance'
      ],
      cta: { href: '#contact', label: 'Talk Strategy' },
      placeholder: false
    }
  ],
  support: {
    label: 'Supporting capabilities',
    note: 'Available alongside your core manufacturing engagement, not positioned as the headline offer:',
    items: [
      'Intellectual property — trademark, patent & copyright protection',
      'Brand, identity & communication collaterals',
      'Websites, SEO & digital presence'
    ]
  },
  cta: {
    note: 'Not sure which of these fits your business? Start with the free 30-minute diagnostic — no obligation.',
    href: '#contact',
    label: 'Book a Free Diagnostic'
  }
};

/* Who we support — new units vs growing operations. */
export const audience = {
  kicker: 'Who We Support',
  title: ['From first unit ', 'to next expansion', ''],
  lead: 'Whether you are entering manufacturing or scaling an existing operation, we adjust the approach to your size and goals.',
  items: [
    {
      icon: 'factory',
      title: 'Entrepreneurs & New Units',
      text: 'Getting registrations, funding and compliance right from day one — so early mistakes never become expensive habits.'
    },
    {
      icon: 'cross',
      title: 'SMEs & MSMEs',
      text: 'Scaling operations, improving cash flow and accessing subsidies and incentives that make growing more profitable.'
    },
    {
      icon: 'target',
      title: 'Existing & Expanding Manufacturers',
      text: 'Optimising structures, managing compliance and certifications at scale, and planning the next chapter of growth with confidence.'
    }
  ],
  duo: {
    start: {
      tag: 'Starting out',
      title: 'New to manufacturing?',
      points: [
        'Structure and registration in place from day one',
        'Funding and subsidy eligibility understood before big investments',
        'Compliance set up once — correctly'
      ]
    },
    grow: {
      tag: 'Scaling up',
      title: 'Growing an existing operation?',
      points: [
        'Funding and incentives structured for expansion',
        'Certification and documentation readiness for tenders and finance',
        'Structure, advisory and liaisoning as you scale'
      ]
    }
  }
};

/* Government schemes — carefully qualified. Never a promise of approval. */
export const schemes = {
  kicker: 'Funding & Incentives',
  title: ['Government schemes you may be ', 'missing out on', ''],
  lead: 'Manufacturing has dedicated subsidy instruments and incentives. We help you check which ones apply to your situation — always against current official rules.',
  rows: [
    {
      flag: 'CL',
      title: 'CLCSS — capital subsidy',
      text: 'A capital subsidy on eligible plant and machinery for technology upgradation by MSME units — subject to eligibility and current official guidelines.',
      type: 'Subject to eligibility'
    },
    {
      flag: 'PL',
      title: 'PLI — Production Linked Incentive',
      text: 'Performance-linked incentives across notified manufacturing sectors, tied to production and investment thresholds.',
      type: 'Notified sectors'
    },
    {
      flag: 'MS',
      title: 'MSME credit support',
      text: 'PMEGP, MUDRA and CGTMSE — credit-linked support and collateral-free guarantees where eligibility applies.',
      type: 'Eligibility varies'
    },
    {
      flag: 'ST',
      title: 'State industrial incentives',
      text: 'State-level packages, subsidies and concessions for new and expanding units.',
      type: 'State-specific'
    }
  ],
  note: 'Important: Scheme names, eligibility and availability change frequently and are never guaranteed. This is guidance, not a promise — we verify every scheme against the latest official rules before we advise you to apply.'
};

export const why = {
  kicker: 'Why ArthoVista',
  title: ['Evidence over assertion. ', 'Execution over advice.', ''],
  lead: 'The strongest difference is simple: we execute the work — not merely advise you on what to do.',
  items: [
    {
      icon: 'handshake',
      title: 'We execute — not just advise',
      text: 'Filing, liaisoning and follow-up are done for you. You get execution, not a checklist or a to-do list.'
    },
    {
      icon: 'factory',
      title: 'Manufacturing-familiar support',
      text: 'Working knowledge of machinery-based capital, subsidy structures and plant-side realities across commissioning and upgrading units.'
    },
    {
      icon: 'doc',
      title: 'Structured, review-ready documentation',
      text: 'Documents prepared carefully to reduce avoidable deficiencies — so applications and reviews move.'
    },
    {
      icon: 'shield',
      title: 'Active scheme navigation',
      text: 'We identify what may apply and follow applications through the process, with eligibility always verified against current rules.'
    },
    {
      icon: 'clock',
      title: 'Transparent communication',
      text: 'No fabricated numbers, no promised approvals we cannot control. Costs, scope and timelines are set out up front, in writing.'
    }
  ]
};

/* Documentation — "typical requirements may include" framing (§19). */
export const documentation = {
  kicker: 'Paperwork, Handled',
  title: ['Documentation & compliance, ', 'simplified', ''],
  lead: 'The right records keep your business protected, fundable and audit-ready. Typical requirements may include:',
  items: [
    {
      icon: 'file',
      title: 'Registrations & Licences',
      text: 'GST, factory-related, trade and other registrations tracked and renewed on time, where applicable to your unit.'
    },
    {
      icon: 'doc',
      title: 'Filings & Returns',
      text: 'Statutory and tax-related filing support — prepared accurately and on schedule.'
    },
    {
      icon: 'shield',
      title: 'Certifications',
      text: 'ZED, ISO and other relevant certification pathways, subject to applicability to your operations.'
    },
    {
      icon: 'chart',
      title: 'DPR & Financial Documentation',
      text: 'Project reports, financial models and lender or investor documentation for funding conversations.'
    }
  ],
  note: 'Requirements vary by entity, industry, location and engagement scope. We confirm what actually applies before recommending anything.'
};

export const faq = {
  kicker: 'FAQ',
  title: ['Questions, ', 'answered', ''],
  items: [
    {
      q: 'What does ArthoVista do for manufacturing businesses?',
      a: 'We are an execution-led partner — handling company setup, government funding and subsidies, compliance, certifications and documentation for manufacturing units. We do the filing, liaisoning and follow-up, not just the advice.'
    },
    {
      q: 'Do I need every service on this page?',
      a: 'No. Requirements vary by entity, industry, location and engagement scope. We confirm what actually applies to you during the diagnostic — you only engage where it makes sense.'
    },
    {
      q: 'How do you charge for your services?',
      a: 'Engagement models vary by scope. We explain all costs and terms up front, in writing, before any work begins — no surprises.'
    },
    {
      q: 'Can you help us access government schemes and subsidies?',
      a: 'Yes — we help identify schemes you may qualify for, prepare the application and follow it through the process. Eligibility is always verified against current official rules, and we never promise approvals we cannot control.'
    },
    {
      q: 'Do you work with manufacturers in my industry?',
      a: 'Manufacturing is a core focus — commissioning and upgrading units across sectors, including machinery-based capital and subsidy structures. We confirm fit in your first diagnostic.'
    },
    {
      q: 'How long does the process take?',
      a: 'It depends on the scope and how quickly the required information is available. After the diagnostic we give a realistic timeline for the steps within our control. Approval timelines rest with the authorities — we follow up continuously.'
    },
    {
      q: 'Is the first diagnostic really free?',
      a: 'Yes. It is a 30-minute, no-obligation conversation that delivers an initial growth roadmap and confirms whether we are a good fit.'
    }
  ]
};

export const contact = {
  kicker: 'Get In Touch',
  title: ['Start a conversation with an ', 'expert', ''],
  lead: 'Tell us a little about your business and we will respond to arrange your free diagnostic.',
  info: {
    phone: '+91 98999 02568',
    phoneHref: 'tel:+919899902568',
    whatsapp: 'WhatsApp: +91 98999 02568',
    whatsappHref: 'https://wa.me/919899902568',
    email: 'support@arthovista.com',
    emailHref: 'mailto:support@arthovista.com',
    website: 'arthovistaservices.sbs',
    websiteHref: 'https://arthovistaservices.sbs',
    officesLabel: 'Offices',
    offices: [
      { city: 'Noida', area: 'Sector 62', tag: 'Corporate HQ' },
      { city: 'New Delhi', area: '', tag: 'Policy & Regulatory' },
      { city: 'Lucknow', area: '', tag: 'UP Enterprise Access' },
      { city: 'Indore', area: '', tag: 'Central India Manufacturing' },
      { city: 'Amravati', area: '', tag: 'Maharashtra Industrial Zone' }
    ]
  },
  note: 'We respect your privacy. Your details are used only to respond to your enquiry.',
  fields: {
    name: { label: 'Full name *', type: 'text', autocomplete: 'name' },
    mobile: { label: 'Mobile *', type: 'tel', autocomplete: 'tel' },
    email: { label: 'Work email *', type: 'email', autocomplete: 'email' },
    company: { label: 'Company / Business name *', type: 'text', autocomplete: 'organization' },
    biztype: {
      label: 'Business stage *',
      type: 'select',
      options: ['', 'Starting a manufacturing unit', 'SME / MSME', 'Existing manufacturer', 'Expanding manufacturer', 'Other']
    },
    requirement: {
      label: 'Primary requirement',
      type: 'select',
      options: ['', 'Company setup', 'Funding / subsidies', 'Compliance & certifications', 'DPR / documentation', 'Advisory', 'Other']
    },
    message: { label: 'How can we help? (optional)', type: 'textarea' }
  },
  submitLabel: 'Request a Free Diagnostic'
};

export const ctaBand = {
  title: 'Your plant should be focused on production.',
  text: 'Let us handle more of the business-side complexity. Book a free 30-minute diagnostic to discuss your setup, funding, compliance or expansion requirements.',
  cta: { href: '#contact', label: 'Book Free Diagnostic' }
};

export const footer = {
  about: 'ArthoVista is an execution-led partner for manufacturing businesses — setup, funding, compliance, certifications, documentation and advisory, done for you.',
  officesLine: 'Offices: Noida (HQ) · New Delhi · Lucknow · Indore · Amravati',
  columns: [
    {
      title: 'Services',
      links: [
        { href: '#services', label: 'Setup & registrations' },
        { href: '#services', label: 'Funding & subsidies' },
        { href: '#services', label: 'Compliance & certifications' },
        { href: '#documentation', label: 'Documentation & DPR' }
      ]
    },
    {
      title: 'Company',
      links: [
        { href: '#why', label: 'Why ArthoVista' },
        { href: '#lifecycle', label: 'Our approach' },
        { href: '#faq', label: 'FAQ' },
        { href: '#contact', label: 'Contact' }
      ]
    },
    {
      title: 'Get in touch',
      links: [
        { href: 'tel:+919899902568', label: 'Call +91 98999 02568' },
        { href: 'https://wa.me/919899902568', label: 'WhatsApp us' },
        { href: 'mailto:support@arthovista.com', label: 'support@arthovista.com' },
        { href: 'https://arthovistaservices.sbs', label: 'arthovistaservices.sbs' }
      ]
    }
  ],
  bottom: '© {year} ArthoVista. All rights reserved.'
};