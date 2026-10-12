import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || "xavifarmartinez@gmail.com";
const CONTACT_LIMIT_PER_10_MIN = 3;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req);

  // Rate limit contact form submissions: max 3 messages per 10 minutes per IP
  const limitCheck = checkRateLimit({
    namespace: "contact-form",
    key: clientIp,
    limit: CONTACT_LIMIT_PER_10_MIN,
    windowMs: 10 * 60 * 1000,
  });

  if (!limitCheck.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate_limit",
        retryAfter: limitCheck.retryAfterSeconds,
        messageEs: `Has enviado varios mensajes recientemente. Espera ${limitCheck.retryAfterSeconds}s antes de enviar otro.`,
        messageEn: `You have sent several messages recently. Please wait ${limitCheck.retryAfterSeconds}s before sending another.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limitCheck.retryAfterSeconds),
        },
      }
    );
  }

  try {
    const body = await req.json();
    const handle = String(body.handle || "").trim().slice(0, 120);
    const message = String(body.message || "").trim().slice(0, 2500);
    const honeypot = String(body.website || "").trim();

    // Silent anti-bot honeypot trap
    if (honeypot) {
      return NextResponse.json({ ok: true, provider: "honeypot" });
    }

    if (!message || message.length < 2) {
      return NextResponse.json(
        {
          ok: false,
          error: "invalid_message",
          messageEs: "Por favor, escribe un mensaje válido.",
          messageEn: "Please enter a valid message.",
        },
        { status: 400 }
      );
    }

    const senderLabel = handle || "Visitante anónimo (Portfolio)";
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(handle);
    const subject = `Nuevo mensaje del Portfolio — ${senderLabel}`;

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 12px; color: #171717;">
        <h2 style="margin: 0 0 16px; font-size: 18px; font-weight: 600;">Nuevo mensaje desde xavifar.dev</h2>
        <p style="margin: 0 0 12px; font-size: 14px; color: #525252;">
          <strong>Remitente / Contacto:</strong> ${escapeHtml(senderLabel)}
        </p>
        <div style="padding: 16px; background: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
        <p style="margin: 16px 0 0; font-size: 11px; color: #a3a3a3;">
          IP: ${escapeHtml(clientIp)} · Enviado desde el formulario de contacto de Xavi Far Portfolio
        </p>
      </div>
    `;

    // Provider 1: Gmail / Custom SMTP via Nodemailer (if GMAIL_APP_PASSWORD or SMTP_PASS is set)
    const smtpPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const smtpUser = process.env.SMTP_USER || RECIPIENT_EMAIL;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;

    if (smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Xavi Far Portfolio" <${smtpUser}>`,
        to: RECIPIENT_EMAIL,
        replyTo: isValidEmail ? handle : undefined,
        subject,
        text: `Remitente: ${senderLabel}\n\nMensaje:\n${message}`,
        html: htmlBody,
      });

      return NextResponse.json({ ok: true, provider: "smtp" });
    }

    // Provider 2: Resend API (if RESEND_API_KEY is set)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Portfolio Contact <onboarding@resend.dev>",
          to: [RECIPIENT_EMAIL],
          reply_to: isValidEmail ? handle : undefined,
          subject,
          html: htmlBody,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json({ ok: true, provider: "resend" });
      }
    }

    // Provider 3: Web3Forms API (if WEB3FORMS_ACCESS_KEY is set)
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3FormsKey) {
      const w3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject,
          from_name: senderLabel,
          email: isValidEmail ? handle : RECIPIENT_EMAIL,
          message,
        }),
      });

      if (w3Res.ok) {
        return NextResponse.json({ ok: true, provider: "web3forms" });
      }
    }

    // Provider 4: FormSubmit.co zero-config relay to xavifarmartinez@gmail.com
    const formSubmitRes = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "https://xavifar.dev",
          Origin: "https://xavifar.dev",
        },
        body: JSON.stringify({
          name: senderLabel,
          email: isValidEmail ? handle : "contacto@xavifar.dev",
          _subject: subject,
          message,
          _template: "box",
        }),
      }
    );

    if (formSubmitRes.ok) {
      const data = await formSubmitRes.json().catch(() => ({}));
      if (data.success === "true" || data.success === true) {
        return NextResponse.json({ ok: true, provider: "formsubmit" });
      }
      // If FormSubmit requires one-time email activation or returns info message, still inform client
      return NextResponse.json({
        ok: true,
        provider: "formsubmit",
        note: data.message,
      });
    }

    return NextResponse.json(
      {
        ok: false,
        error: "provider_unconfigured",
        messageEs:
          "Configura GMAIL_APP_PASSWORD o RESEND_API_KEY en .env.local para envío SMTP directo.",
        messageEn:
          "Configure GMAIL_APP_PASSWORD or RESEND_API_KEY in .env.local for direct SMTP delivery.",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "server_error",
        messageEs: "Error al enviar el mensaje. Inténtalo de nuevo.",
        messageEn: "Failed to send message. Please try again.",
      },
      { status: 500 }
    );
  }
}
