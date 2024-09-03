const { Router } = require("express");
const {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  actualizarUnUsuario,
  borrardoFisicoUsuario,
  inicioDeSesionUsuario,
  habilitarUsuario,
  deshabilitarUsuario,
} = require("../controllers/usuarios.controllers");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/", auth("admin"), obtenerTodosLosUsuarios);
router.get("/:idUsuario", auth("admin"), obtenerUnUsuario);

router.post(
  "/",
  [
    check("nombreUsuario", "Campo NOMBREUSUARIO esta vacio").not().isEmpty(),
    check("contrasenia", "Campo CONTRSAENIA esta vacio").not().isEmpty(),
    check("contrasenia", "Min: 8 caracteres y Max: 30 caracteres").isLength({
      min: 8,
      max: 30,
    }),
  ],
  crearUsuario
);
router.post("/iniciarSesion", inicioDeSesionUsuario);

router.put("/deshabilitar/:idUsuario", auth("admin"), deshabilitarUsuario);
router.put("/habilitar/:idUsuario", auth("admin"), habilitarUsuario);
router.put("/:idUsuario", auth("admin"), actualizarUnUsuario);
router.delete("/:idUsuario", auth("admin"), borrardoFisicoUsuario);

module.exports = router;
