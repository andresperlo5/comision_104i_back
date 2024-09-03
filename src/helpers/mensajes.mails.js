const transporter = require("../helpers/nodemailer.config");

const darBienvenidaAlUsuario = async (emailUsuario, nombreUsuario) => {
  await transporter.sendMail({
    from: `"Maddison Foo Koch 👻" <${process.env.GMAIL_USER}>`, // sender address
    to: `${emailUsuario}`, // list of receivers
    subject: "Alta en nuestra tienda ✔", // Subject line
    html: `
    
     <div>
      <div style="display: flex; justify-content: center">
        <img
          src="https://images.vexels.com/content/234933/preview/bienvenida-badge-banner-8aaee8.png"
          alt=""
        />
      </div>
      <div>
        <p>
          Gracias por formar parte de nuestra familia. Te damos la bienvenida ${nombreUsuario}
        </p>
      </div>
    </div>
    
    `, // html body
  });
};

const recuperarContrasenia = async (emailUsuario) => {
  await transporter.sendMail({
    from: `"Maddison Foo Koch 👻" <${process.env.GMAIL_USER}>`, // sender address
    to: `${emailUsuario}`, // list of receivers
    subject: "Pasos para recuperar tu contraseña ✔", // Subject line
    html: `
    
     <div>
      <div style="display: flex; justify-content: center">
        <img
          src="https://images.vexels.com/content/234933/preview/bienvenida-badge-banner-8aaee8.png"
          alt=""
        />
      </div>
      <div>
        <p>
          Gracias por formar parte de nuestra familia. Te damos la bienvenida ${nombreUsuario}
        </p>
      </div>
    </div>
    
    `, // html body
  });
};

module.exports = {
  darBienvenidaAlUsuario,
  recuperarContrasenia,
};
