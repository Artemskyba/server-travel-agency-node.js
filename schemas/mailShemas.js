export const verificationEmailConfigSchema = (
  MAIL_SERVICE_USER,
  email,
  identifier,
) => {
  return {
    from: MAIL_SERVICE_USER,
    to: email,
    subject: 'Email verification',
    text: `Veirify your emai. http://localhost:3000/api/user/verify/${identifier}`,
    html: `<table
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        border-collapse: collapse;
      "
    >
      <tr>
        <td align="center" style="padding: 0 20px">
          <h2
            style="
              font-family: Arial, sans-serif;
              font-size: 28px;
              color: #323f47;
              margin-bottom: 48px;
            "
          >
            Verify your email
          </h2>
          <p
            style="
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #2f2f2f;
              line-height: 1.5;
              margin-bottom: 32px;
            "
          >
            Use the link below to verify your email and start enjoying the
            AquaTrack App!
          </p>
          <a
            href="http://localhost:3000/api/user/verify/${identifier}"
            style="
              display: inline-block;
              background-color: #9be1a0;
              color: #323f47;
              border-radius: 30px;
              padding: 16px 32px;
              font-family: Arial, sans-serif;
              text-decoration: none;
              font-weight: 700;
              margin-bottom: 32px;
            "
            >Verify email</a
          >
          <p
            style="
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #2f2f2f;
              line-height: 1.5;
              margin: 0;
              margin-bottom: 48px;
            "
          >
            If you did not sign up for this account, please ignore this email.
          </p>
        </td>
      </tr>
    </table>
`,
  };
};
