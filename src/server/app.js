require("dotenv").config();
require("../DB/config");
const express = require("express"); /* conmojs */
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.middlewares();
    this.rutas();
  }

  middlewares() {
    /* middlewares */
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname + "/public")));
  }

  rutas() {
    this.app.use("/productos", require("../routes/productos.routes"));
    this.app.use("/usuarios", require("../routes/usuarios.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor levantado ", this.port);
    });
  }
}

module.exports = Server;
