/* ============================================================
   ARTHOVISTA — SITE CONFIG
   ------------------------------------------------------------
   FORM SUBMISSION
   To go live with REAL lead capture, set FORM.ENDPOINT to your
   backend or a form service (e.g. Formspree, Basin, Web3Forms,
   or your own API). The form will POST JSON to this URL.

   Keep ENABLED = false to make the form clearly report that
   the backend is not yet wired. The UI will NEVER show a fake
   success message — if the backend isn't configured, we say so.
============================================================ */
window.ARTHOVISTA_CONFIG = {
  FORM: {
    ENABLED: true,
    ENDPOINT: "",
    METHOD: "POST"
  },

  /* ----------------------------------------------------------
     SUPABASE — direct REST lead capture
     Set URL (project URL), TABLE ("leads_startup_india") and
     ANON_KEY (Dashboard → Settings → API → anon public key).

     Table must have RLS enabled with an INSERT-only policy for
     `anon` — otherwise Supabase blocks browser inserts by default.

     Leave ANON_KEY as "PASTE_YOUR_ANON_KEY_HERE" to keep the
     form honestly reporting that the backend is not wired yet.
  ------------------------------------------------------------ */
  SUPABASE: {
    URL: "https://kfncwvkzzhgqhlmanrla.supabase.co",
    TABLE: "leads_startup_india",
    ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmbmN3dmt6emhncWhsbWFucmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NjU5MDksImV4cCI6MjEwNTA0MTkwOX0.FUvqGZul1gkx7X7aWLPDK1fUkWevDlx83P7sDezEzGc"
  },

  /* ----------------------------------------------------------
     ANALYTICS
     Set ENABLED = true and provide a callback to send events to
     your analytics provider. `track(name, data)` is called on key
     interactions (see main.js for the full event list).
  ------------------------------------------------------------ */
  ANALYTICS: {
    ENABLED: false,
    track: function (name, data) {
      // Example (Google Analytics 4):
      // if (window.gtag) {
      //   gtag("event", name, data || {});
      // }
      console.log("[analytics]", name, data || {});
    }
  }
};
