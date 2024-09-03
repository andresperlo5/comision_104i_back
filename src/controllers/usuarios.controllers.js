const { validationResult } = require("express-validator");
const serviciosUsuarios = require("../services/usuarios.services");

const obtenerTodosLosUsuarios = async (req, res) => {
  const result = await serviciosUsuarios.obtenerUsuarios();

  if (result.statusCode === 200) {
    res.status(200).json({ usuarios: result.usuarios });
  } else {
    res.status(500).json({ msg: "Error al traer los usuarios" });
  }
};

const obtenerUnUsuario = async (req, res) => {
  const result = await serviciosUsuarios.obtenerUsuario(req.params.idUsuario);

  if (result.statusCode === 200) {
    res.status(200).json({ usuario: result.usuario });
  } else {
    res.status(500).json({ msg: "Error al traer el usuarios" });
  }
};

const crearUsuario = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }

  const result = await serviciosUsuarios.nuevoUsuario(req.body);

  if (result.statusCode === 201) {
    res.status(201).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al crear el usuario: " + result.msg });
  }
};

const actualizarUnUsuario = async (req, res) => {
  const result = await serviciosUsuarios.actualizarUsuario(
    req.params.idUsuario,
    req.body
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg, usuarios: result.usuarios });
  } else {
    res.status(500).json({ msg: "Error al actualizar al usuario" });
  }
};

const borrardoFisicoUsuario = async (req, res) => {
  const result = await serviciosUsuarios.borrarUsuario(req.params.idUsuario);

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al borrar al usuario" });
  }
};

const inicioDeSesionUsuario = async (req, res) => {
  const result = await serviciosUsuarios.iniciarSesion(req.body);

  if (result.statusCode === 200) {
    res
      .status(200)
      .json({ msg: result.msg, token: result.token, rol: result.rol });
  } else if (result.statusCode === 400) {
    res.status(400).json({ msg: result.msg, bloqueado: true });
  } else {
    res.status(500).json({ msg: "Error al iniciar sesion del usuario" });
  }
};

const habilitarUsuario = async (req, res) => {
  const result = await serviciosUsuarios.desbloquearUsuarioPorId(
    req.params.idUsuario
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al habilitar al usuario" });
  }
};

const deshabilitarUsuario = async (req, res) => {
  const result = await serviciosUsuarios.bloquearUsuarioPorId(
    req.params.idUsuario
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al deshabilitar al usuario" });
  }
};

module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  crearUsuario,
  actualizarUnUsuario,
  borrardoFisicoUsuario,
  inicioDeSesionUsuario,
  habilitarUsuario,
  deshabilitarUsuario,
};
