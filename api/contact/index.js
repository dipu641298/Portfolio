// POST /api/contact  { name, email, message }
//
// This validates the submission and returns success. By default it simply
// logs the message (visible in your Static Web App's Functions logs).
//
// To actually receive emails, pick ONE option:
//   1. SendGrid — uncomment the block below and set the SENDGRID_API_KEY and
//      CONTACT_TO app settings in the Azure portal (Configuration).
//   2. Azure Communication Services Email — similar pattern with its SDK.
//   3. Or remove this function entirely and point the form at a hosted
//      service like Web3Forms (see README).

module.exports = async function (context, req) {
  const body = req.body || {};
  const name = (body.name || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const message = (body.message || "").toString().trim();

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailLooksValid || !message) {
    context.res = {
      status: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Please provide a name, a valid email, and a message." })
    };
    return;
  }

  context.log(`Contact form: ${name} <${email}> — ${message.slice(0, 200)}`);

  // --- Option 1: SendGrid (npm i @sendgrid/mail, add it to api/package.json) ---
  // const sgMail = require("@sendgrid/mail");
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // await sgMail.send({
  //   to: process.env.CONTACT_TO,
  //   from: process.env.CONTACT_FROM, // a verified SendGrid sender
  //   replyTo: email,
  //   subject: `Portfolio contact from ${name}`,
  //   text: `${name} <${email}>\n\n${message}`
  // });

  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true })
  };
};
