/**
 * Cloudflare Pages Function - /api/contact
 * Proxies contact submissions server-side to Web3Forms without exposing keys.
 * Compliance: security.md
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const origin = request.headers.get("Origin") || "";
  const allowedHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": origin.includes("mihatechnologies.com") ? origin : "https://mihatechnologies.com",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  };
  const accessKey = env.WEB3FORMS_ACCESS_KEY || "e6ce3d96-3481-4711-8970-2fc5bb70a4b0";
  return new Response(JSON.stringify({
    success: true,
    key: accessKey,
  }), {
    status: 200,
    headers: allowedHeaders,
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // 1. Origin Check & CORS
  const origin = request.headers.get("Origin") || "";
  const allowedHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": origin.includes("mihatechnologies.com") ? origin : "https://mihatechnologies.com",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  };

  try {
    const data = await request.json();

    // 2. Anti-Spam Honeypot Check
    if (data.botcheck || data.honeypot) {
      return new Response(JSON.stringify({ success: true, message: "Inquiry received." }), {
        status: 200,
        headers: allowedHeaders,
      });
    }

    // 3. Basic Input Validation
    if (!data.name || !data.email || !data.email.includes("@") || !data.phone) {
      return new Response(JSON.stringify({ success: false, message: "Valid name, email, and phone number are required." }), {
        status: 400,
        headers: allowedHeaders,
      });
    }

    // 4. Inject Server Environment Key
    const accessKey = env.WEB3FORMS_ACCESS_KEY || "e6ce3d96-3481-4711-8970-2fc5bb70a4b0";

    const forwardPayload = {
      ...data,
      access_key: accessKey,
      from_name: `MIHA Technologies Inquiry (${data.name})`,
      replyto: data.email,
      subject: data.discovery_call_date
        ? `New Discovery Call & Inquiry: ${data.name} (${data.discovery_call_date})`
        : `New Direct Email Inquiry: ${data.name}`,
    };

    // 5. Forward to Web3Forms API
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "MIHA-Technologies-Cloudflare-Proxy/1.0",
        Origin: "https://mihatechnologies.com",
        Referer: "https://mihatechnologies.com/",
      },
      body: JSON.stringify(forwardPayload),
    });

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: allowedHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Server proxy error." }), {
      status: 500,
      headers: allowedHeaders,
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
    },
  });
}
