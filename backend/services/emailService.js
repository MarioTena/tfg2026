const nodemailer = require("nodemailer");

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta ${name} en el .env`);
  }
  return value;
}

function getAppBaseUrl() {
  const baseUrl = getRequiredEnv("APP_BASE_URL");
  return baseUrl.replace(/\/+$/, "");
}

function createTransporter() {
  const host = getRequiredEnv("SMTP_HOST");
  const user = getRequiredEnv("SMTP_USER");
  const pass = getRequiredEnv("SMTP_PASS");

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE) === "true",
    family: 4,
    auth: {
      user,
      pass,
    },
  });
}

async function sendVerifyEmail({ to, name, verifyUrl }) {
  const transporter = createTransporter();

  const html = `
    <div style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,sans-serif;color:#162033;">
      <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
        <div style="background:linear-gradient(135deg,#4f8cff,#2ce6ff,#8b5cf6);border-radius:24px 24px 0 0;padding:28px 32px;color:#ffffff;">
          <div style="font-size:14px;opacity:0.9;margin-bottom:8px;">TFG Python</div>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">Verifica tu correo</h1>
          <p style="margin:12px 0 0;font-size:16px;line-height:1.6;opacity:0.95;">
            Hola, ${name}. Ya casi está todo listo.
          </p>
        </div>

        <div style="background:#ffffff;border:1px solid #e7edf5;border-top:none;border-radius:0 0 24px 24px;padding:32px;">
          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#334155;">
            Pulsa en el siguiente botón para verificar tu correo y activar tu cuenta.
          </p>

          <div style="margin:28px 0;">
            <a href="${verifyUrl}"
               style="display:inline-block;padding:14px 24px;border-radius:14px;
                      background:linear-gradient(135deg,#4ade80,#22c55e);
                      color:#03121d;text-decoration:none;font-weight:700;font-size:15px;">
              Verificar correo
            </a>
          </div>

          <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#64748b;">
            Este enlace es temporal y caducará pronto por seguridad.
          </p>

          <p style="margin:0;font-size:14px;line-height:1.7;color:#64748b;">
            Si no has solicitado este registro, puedes ignorar este correo.
          </p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"TFG Python" <${process.env.SMTP_USER}>`,
    to,
    subject: "Verifica tu correo - TFG Python",
    html,
  });
}

async function sendWelcomeEmail({ to, name }) {
  const transporter = createTransporter();
  const appBaseUrl = getAppBaseUrl();

  const html = `
    <div style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,sans-serif;color:#162033;">
      <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
        <div style="background:linear-gradient(135deg,#4f8cff,#2ce6ff,#8b5cf6);border-radius:24px 24px 0 0;padding:28px 32px;color:#ffffff;">
          <div style="font-size:14px;opacity:0.9;margin-bottom:8px;">TFG Python</div>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">¡Bienvenido/a, ${name}!</h1>
          <p style="margin:12px 0 0;font-size:16px;line-height:1.6;opacity:0.95;">
            Tu cuenta ya está creada y lista para empezar a practicar.
          </p>
        </div>

        <div style="background:#ffffff;border:1px solid #e7edf5;border-top:none;border-radius:0 0 24px 24px;padding:32px;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
            Ya puedes acceder a la plataforma y comenzar tu recorrido de aprendizaje.
          </p>

          <div style="margin:28px 0;">
            <a href="${appBaseUrl}/login.html"
               style="display:inline-block;padding:14px 24px;border-radius:14px;
                      background:linear-gradient(135deg,#4ade80,#22c55e);
                      color:#03121d;text-decoration:none;font-weight:700;font-size:15px;">
              Entrar a la plataforma
            </a>
          </div>

          <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:#64748b;">
            Si no has solicitado este registro, puedes ignorar este correo.
          </p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"TFG Python" <${process.env.SMTP_USER}>`,
    to,
    subject: "Bienvenido/a a TFG Python",
    html,
  });
}



async function sendResetPasswordEmail({ to, name, resetUrl }) {
  const transporter = createTransporter();

  const html = `
    <div style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,sans-serif;color:#162033;">
      <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
        <div style="background:linear-gradient(135deg,#ff7aa2,#ff4ecd);border-radius:24px 24px 0 0;padding:28px 32px;color:#ffffff;">
          <div style="font-size:14px;opacity:0.9;margin-bottom:8px;">TFG Python</div>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">Recuperación de contraseña</h1>
          <p style="margin:12px 0 0;font-size:16px;line-height:1.6;opacity:0.95;">
            Hemos recibido una solicitud para cambiar tu contraseña.
          </p>
        </div>

        <div style="background:#ffffff;border:1px solid #e7edf5;border-top:none;border-radius:0 0 24px 24px;padding:32px;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
            Hola, ${name}.
          </p>

          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#334155;">
            Pulsa en el siguiente botón para crear una nueva contraseña y recuperar el acceso a tu cuenta.
          </p>

          <div style="margin:28px 0;">
            <a href="${resetUrl}"
               style="display:inline-block;padding:14px 24px;border-radius:14px;
                      background:linear-gradient(135deg,#4f8cff,#2ce6ff);
                      color:#03121d;text-decoration:none;font-weight:700;font-size:15px;">
              Cambiar contraseña
            </a>
          </div>

          <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#64748b;">
            Este enlace es temporal y caducará pronto por seguridad.
          </p>

          <p style="margin:0;font-size:14px;line-height:1.7;color:#64748b;">
            Si no has solicitado este cambio, puedes ignorar este correo.
          </p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"TFG Python" <${process.env.SMTP_USER}>`,
    to,
    subject: "Recuperación de contraseña - TFG Python",
    html,
  });
}

module.exports = {
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendVerifyEmail,
};