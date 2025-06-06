export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) => `
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #2c3e50; max-width: 620px; margin: 0 auto; background-color: #f8f9fb;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);">
    <tr>
      <td style="background-color: #2f80ed; text-align: center; padding: 30px 0;">
        <h1 style="font-size: 40px; color: #ffffff; margin: 0;">SubDub</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 35px 30px;">
        <p style="font-size: 16px; margin-bottom: 22px;">
          Hi <strong style="color: #2f80ed;">${userName}</strong>,
        </p>
        <p style="font-size: 16px; margin-bottom: 22px;">
          Your <strong>${subscriptionName}</strong> subscription will renew on 
          <strong style="color: #2f80ed;">${renewalDate}</strong> (${daysLeft} days left).
        </p>

        <table cellpadding="12" cellspacing="0" border="0" width="100%" style="background-color: #eef3fc; border-radius: 10px; margin-bottom: 25px;">
          <tr>
            <td style="font-size: 15px; border-bottom: 1px solid #d5e3fc;">
              <strong>Plan:</strong> ${planName}
            </td>
          </tr>
          <tr>
            <td style="font-size: 15px; border-bottom: 1px solid #d5e3fc;">
              <strong>Price:</strong> ${price}
            </td>
          </tr>
          <tr>
            <td style="font-size: 15px;">
              <strong>Payment Method:</strong> ${paymentMethod}
            </td>
          </tr>
        </table>

        <p style="font-size: 15px; margin-bottom: 22px;">
          To manage or cancel your subscription, head over to your 
          <a href="${accountSettingsLink}" style="color: #2f80ed; text-decoration: underline;">account settings</a> before the renewal date.
        </p>

        <p style="font-size: 15px; margin-top: 30px;">
          Need help? 
          <a href="${supportLink}" style="color: #2f80ed; text-decoration: underline;">Contact support</a>.
        </p>

        <p style="font-size: 15px; margin-top: 35px;">
          Best,<br>
          <strong>The SubDub Team</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #eef3fc; padding: 20px; text-align: center; font-size: 13px; color: #7f8c8d;">
        <p style="margin: 0 0 8px;">SubDub Inc. | 123 Main St, Anytown, AN 12345</p>
        <p style="margin: 0;">
          <a href="#" style="color: #2f80ed; text-decoration: none; margin: 0 8px;">Unsubscribe</a> | 
          <a href="#" style="color: #2f80ed; text-decoration: none; margin: 0 8px;">Privacy Policy</a> | 
          <a href="#" style="color: #2f80ed; text-decoration: none; margin: 0 8px;">Terms</a>
        </p>
      </td>
    </tr>
  </table>
</div>
`;

export const emailTemplates = [
  {
    label: "7 days before reminder",
    generateSubject: (data) =>
      `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
  },
  {
    label: "5 days before reminder",
    generateSubject: (data) =>
      `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
  },
  {
    label: "2 days before reminder",
    generateSubject: (data) =>
      `🚀 2 Days Left!  ${data.subscriptionName} Subscription Renewal`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
  },
  {
    label: "1 days before reminder",
    generateSubject: (data) =>
      `⚡ Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
  },
];
