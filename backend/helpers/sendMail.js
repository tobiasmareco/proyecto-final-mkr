import nodemailer from "nodemailer";
export async function Send(userEmail, subject, html) {
  var transport = nodemailer.createTransport({
    host: process.env.API_EMAIL_HOST,
    port: process.env.API_EMAIL_PORT || 2525,
    auth: {
      user: process.env.API_EMAIL_USER,
      pass: process.env.API_EMAIL_PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  transport.sendMail(
    {
      from: "InfoTickets<tmareco123@gmail.com.py>",
      to: userEmail,
      subject,
      html,
    },
    (err) => err && console.log({ errmsms: err })
  );
}

export const emailMessages = {
  REGISTER_MESSAGE: (userEmail, linkAcountActivate) => {
    const title = "ProTaskManagment";
    return `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
        </head>
        
        
        <body>
          <style>
            .email-card {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
        
            .container {
              max-width: 400px;
              margin: 0 auto;
              padding: 2px 10px;
              border-radius: 5px;
            }
        
            .title-card {
              text-align: center;
              background-color: rgba(128, 128, 128, 0.03);
              padding: 10px;
            }
        
            .title-card>span {
              color: rgba(3, 3, 212, 0.89);
            }
        
            .user-email {
              font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
              font-style: italic;
            }
        
            .app-name {
              font-style: italic;
              color: blue;
            }
        
            .link-section a {
              text-decoration: none;
            }
        
            .link {
              color: green;
              font: 900;
            }
          </style>
          <div class="email-card">
            <h1 class="title-card">Welcome to <span>${title}</span></h1>
            <div class="container">
              <p><span class="user-email">${userEmail} </span>Hemos recibido una solicitud para activar una cuenta
                en <span class="app-name">${title}.</span></p>
              <div class="link-section">
                <p>para activar la cuenta accede al siguiente link <a href=${linkAcountActivate} class="link">Confirm your account.</a></p>
              </div>
              <p>Si no solicitaste la activacion, favor obviar el mensaje </p>
            </div>
          </div>
        </body>
        
        </html>
        `;
  },
};
