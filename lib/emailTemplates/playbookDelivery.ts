// Dedicated HTML/text builder for the playbook delivery email — kept
// separate from the generic label/value table builder in lib/email.ts
// (sendLeadEmail) because every other transactional email on the site
// intentionally stays as that simple internal-facing table; this one is
// the one visitor-facing "premium resource delivery" email and needed its
// own bespoke, non-tabular design.
//
// Built table-based under the hood for email-client compatibility (no
// flexbox/grid — Outlook's Word rendering engine ignores both), but reads
// top-to-bottom as a single restrained column, not a table. Colors are set
// explicitly (not just on <body>) and `color-scheme`/`supported-color-schemes`
// meta tags are set to `dark` so Apple Mail / Outlook.com's auto dark-mode
// re-coloring doesn't fight the already-dark design.

const SITE_URL = 'https://illussomedia.com';
const PDF_URL = `${SITE_URL}/resources/90-day-home-service-lead-to-booked-job-playbook.pdf`;
const SCORE_URL = `${SITE_URL}/local-dominance-score`;
const COVER_URL = `${SITE_URL}/images/playbook/cover.jpg`;
const COVER_ALT = '90-Day Home Service Lead-to-Booked-Job Playbook';

// Real pixel dimensions of public/images/playbook/cover.jpg (1000x1294),
// scaled to the ~260-320px display width — explicit width/height attributes
// keep email clients from laying out with a collapsed/distorted box before
// (or instead of) loading the image.
const COVER_DISPLAY_WIDTH = 280;
const COVER_DISPLAY_HEIGHT = Math.round((COVER_DISPLAY_WIDTH * 1294) / 1000); // 362

const COLORS = {
  bg: '#0D0D0D',
  panel: '#0D0D0D',
  white: '#FFFFFF',
  body: '#C5C6C7',
  muted: '#8A8B8C',
  teal: '#00A0A0', // slightly lighter than the site's #008080 for AA contrast on a near-black email background
  border: '#262626',
};

const FONT_STACK = "Inter, Arial, Helvetica, sans-serif";

function buttonHtml(label: string, href: string) {
  // Bulletproof button pattern: a table cell carries the background color
  // and rounded corners (renders correctly in Outlook's engine, which
  // ignores border-radius/background on <a> but respects it on <td>), the
  // anchor inside is block-level with its own padding so the full button
  // area is tappable — comfortably over the 44px touch-height minimum.
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
      <tr>
        <td align="center" bgcolor="${COLORS.teal}" style="background-color: ${COLORS.teal}; border-radius: 8px;">
          <a href="${href}" target="_blank"
             style="display: block; padding: 16px 40px; font-family: ${FONT_STACK}; font-size: 16px; line-height: 20px; font-weight: 700; color: #FFFFFF; text-decoration: none; border-radius: 8px; min-height: 44px; box-sizing: border-box;">
            ${label}
          </a>
        </td>
      </tr>
    </table>`;
}

export function buildPlaybookDeliveryHtml(): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>Your Playbook Is Ready.</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body, table, td { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: ${COLORS.bg}; }
    a { color: ${COLORS.teal}; }
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .px { padding-left: 24px !important; padding-right: 24px !important; }
      .h1 { font-size: 26px !important; line-height: 32px !important; }
      .h2 { font-size: 20px !important; line-height: 27px !important; }
      .cover-img { width: 220px !important; height: ${Math.round((220 * 1294) / 1000)}px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${COLORS.bg};">
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all; font-size: 1px; line-height: 1px; color: ${COLORS.bg};">
    Your playbook is ready. Start with the biggest constraint in your current lead process.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLORS.bg}" style="background-color: ${COLORS.bg};">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; max-width: 600px;">

          <!-- Header — small wordmark, nothing else -->
          <tr>
            <td class="px" align="center" style="padding: 0 24px 32px 24px;">
              <span style="font-family: ${FONT_STACK}; font-size: 15px; font-weight: 800; letter-spacing: 0.14em; color: ${COLORS.white};">LUSSO MEDIA</span>
            </td>
          </tr>

          <!-- Eyebrow -->
          <tr>
            <td class="px" align="center" style="padding: 0 24px 12px 24px;">
              <span style="font-family: ${FONT_STACK}; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; color: ${COLORS.teal}; text-transform: uppercase;">Your Playbook Is Ready</span>
            </td>
          </tr>

          <!-- H1 -->
          <tr>
            <td class="px h1" align="center" style="padding: 0 24px 20px 24px; font-family: ${FONT_STACK}; font-size: 32px; line-height: 38px; font-weight: 800; color: ${COLORS.white}; letter-spacing: -0.01em;">
              Your Playbook Is Ready.
            </td>
          </tr>

          <!-- Body copy — two short paragraphs -->
          <tr>
            <td class="px" align="center" style="padding: 0 24px 8px 24px; font-family: ${FONT_STACK}; font-size: 16px; line-height: 25px; color: ${COLORS.body};">
              The 90-Day Home Service Lead-to-Booked-Job Playbook walks through the systems for capturing, qualifying, responding to, following up with, and converting more local opportunities.
            </td>
          </tr>
          <tr>
            <td class="px" align="center" style="padding: 0 24px 36px 24px; font-family: ${FONT_STACK}; font-size: 16px; line-height: 25px; color: ${COLORS.body};">
              Start with the section that matches the biggest constraint in your current lead process, then work through the implementation sequence at your own pace.
            </td>
          </tr>

          <!-- Playbook cover — clickable -->
          <tr>
            <td align="center" style="padding: 0 24px 32px 24px;">
              <a href="${PDF_URL}" target="_blank" style="display: inline-block; text-decoration: none;">
                <img
                  src="${COVER_URL}"
                  alt="${COVER_ALT}"
                  width="${COVER_DISPLAY_WIDTH}"
                  height="${COVER_DISPLAY_HEIGHT}"
                  class="cover-img"
                  style="display: block; width: ${COVER_DISPLAY_WIDTH}px; height: ${COVER_DISPLAY_HEIGHT}px; max-width: 100%; border-radius: 10px; border: 1px solid ${COLORS.border};"
                />
              </a>
            </td>
          </tr>

          <!-- Primary CTA -->
          <tr>
            <td align="center" style="padding: 0 24px 16px 24px;">
              ${buttonHtml('Download Playbook', PDF_URL)}
            </td>
          </tr>

          <!-- Short usage guidance -->
          <tr>
            <td class="px" align="center" style="padding: 0 24px 44px 24px; font-family: ${FONT_STACK}; font-size: 14px; line-height: 21px; color: ${COLORS.muted};">
              Start with the section that matches the biggest constraint in your current lead process.
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top: 1px solid ${COLORS.border}; font-size: 1px; line-height: 1px;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- Secondary next step -->
          <tr>
            <td class="px" align="center" style="padding: 40px 24px 8px 24px;">
              <span style="font-family: ${FONT_STACK}; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; color: ${COLORS.teal}; text-transform: uppercase;">What to Do Next</span>
            </td>
          </tr>
          <tr>
            <td class="px h2" align="center" style="padding: 0 24px 14px 24px; font-family: ${FONT_STACK}; font-size: 22px; line-height: 29px; font-weight: 700; color: ${COLORS.white};">
              Find the Biggest Constraint First.
            </td>
          </tr>
          <tr>
            <td class="px" align="center" style="padding: 0 24px 20px 24px; font-family: ${FONT_STACK}; font-size: 15px; line-height: 23px; color: ${COLORS.body};">
              The playbook focuses on the path from lead to booked job. If you want to see how the rest of your growth system stacks up, take the 2-Minute Local Dominance Score.
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 24px 48px 24px;">
              <a href="${SCORE_URL}" target="_blank" style="font-family: ${FONT_STACK}; font-size: 15px; font-weight: 700; color: ${COLORS.teal}; text-decoration: none;">
                Take the 2-Minute Local Dominance Score &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 0 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top: 1px solid ${COLORS.border}; font-size: 1px; line-height: 1px;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="px" align="center" style="padding: 28px 24px 0 24px; font-family: ${FONT_STACK}; font-size: 13px; font-weight: 700; color: ${COLORS.white};">
              Lusso Media
            </td>
          </tr>
          <tr>
            <td class="px" align="center" style="padding: 4px 24px 40px 24px; font-family: ${FONT_STACK}; font-size: 12px; line-height: 18px; color: ${COLORS.muted};">
              Helping established home-service contractors build connected growth systems.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildPlaybookDeliveryText(): string {
  return `LUSSO MEDIA

YOUR PLAYBOOK IS READY

Your Playbook Is Ready.

The 90-Day Home Service Lead-to-Booked-Job Playbook walks through the systems for capturing, qualifying, responding to, following up with, and converting more local opportunities.

Start with the section that matches the biggest constraint in your current lead process, then work through the implementation sequence at your own pace.

Download Playbook: ${PDF_URL}

Start with the section that matches the biggest constraint in your current lead process.

---

WHAT TO DO NEXT

Find the Biggest Constraint First.

The playbook focuses on the path from lead to booked job. If you want to see how the rest of your growth system stacks up, take the 2-Minute Local Dominance Score.

Take the 2-Minute Local Dominance Score: ${SCORE_URL}

---

Lusso Media
Helping established home-service contractors build connected growth systems.`;
}
