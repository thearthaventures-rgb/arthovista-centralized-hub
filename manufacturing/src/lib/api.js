/* API client for the enquiry endpoint.
   Success is ONLY reported on an actual 2xx response from the server.
   Any non-2xx returns { ok:false, message, unavailable } — never a fake success. */

export async function postEnquiry(payload) {
  try {
    const res = await fetch('/api/manufacturing/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      return { ok: true };
    }

    // Server rejected — read message if provided
    let message = 'Something went wrong. Please try again.';
    let unavailable = false;
    try {
      const body = await res.json();
      if (body && body.message) message = body.message;
      if (res.status === 503) {
        unavailable = true;
        if (body && body.configurable) message = body.message;
      }
    } catch (_) { /* ignore parse errors */ }

    return { ok: false, message, unavailable };
  } catch (err) {
    // Network failure — never surface as success
    return {
      ok: false,
      message: 'Could not reach our systems. Please try again or contact us directly.',
      unavailable: false
    };
  }
}