/* ============================================================
   ARTHOVISTA — SITE CONFIG
   ------------------------------------------------------------
   Startup India form submissions go through the server-side Vercel
   endpoint. No Supabase secret or public API key is stored in this
   browser-accessible file.
============================================================ */
window.ARTHOVISTA_CONFIG = {
  FORM: {
    ENABLED: true,
    ENDPOINT: "/api/startup-india/enquiry",
    METHOD: "POST"
  },

  ANALYTICS: {
    ENABLED: false,
    track: function (name, data) {
      console.log("[analytics]", name, data || {});
    }
  }
};
