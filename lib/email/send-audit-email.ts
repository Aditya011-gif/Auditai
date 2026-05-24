import { Resend } from "resend";
import type { AuditResult } from "@/types/audit";
import { convertUsd } from "@/lib/currency";
import { formatCurrency } from "@/lib/utils";

export async function sendAuditEmail(args: { email: string; reportUrl: string; result: AuditResult }) {
  if (!process.env.RESEND_API_KEY) {
    return { skipped: true };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const currency = args.result.input.currency ?? "USD";
  const highSavings = args.result.totals.monthlySavings > convertUsd(500, currency);

  return resend.emails.send({
    from: process.env.EMAIL_FROM ?? "AuditAI <audit@example.com>",
    to: args.email,
    subject: `Your AuditAI report: ${formatCurrency(args.result.totals.annualSavings, currency)} annual savings found`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;background:#08090d;color:#f8fafc;padding:32px">
        <div style="max-width:620px;margin:auto;border:1px solid #222735;border-radius:20px;padding:28px;background:#10131b">
          <p style="color:#2dd4bf;font-weight:700">AuditAI</p>
          <h1 style="font-size:28px;margin:0 0 12px">Your AI spend audit is ready</h1>
          <p style="color:#cbd5e1;line-height:1.6">${args.result.summary}</p>
          <div style="margin:24px 0;padding:18px;border-radius:16px;background:#151a24">
            <strong>Estimated monthly savings:</strong> ${formatCurrency(args.result.totals.monthlySavings, currency)}<br/>
            <strong>Estimated annual savings:</strong> ${formatCurrency(args.result.totals.annualSavings, currency)}
          </div>
          <a href="${args.reportUrl}" style="display:inline-block;background:#2dd4bf;color:#051014;text-decoration:none;font-weight:800;padding:12px 18px;border-radius:999px">Open report</a>
          <p style="color:#94a3b8;margin-top:24px">${highSavings ? "Your report crossed the high-savings threshold. Credex can help evaluate discounted AI credits for the biggest opportunities." : "Your stack looks reasonably disciplined. We will notify you when new optimization opportunities apply."}</p>
        </div>
      </div>`
  });
}
