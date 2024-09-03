const serviciosProductos = require("../services/productos.services");

const obtenerTodosLosProductos = async (req, res) => {
  /* Request - esto es la solicitud que me manda el cliente (front) al server (back)*/
  /* Response - esto es la repuesta del servidor (back) al cliente (front)*/
  const result = await serviciosProductos.obtenerProductos();

  if (result.statusCode === 200) {
    res.status(200).json({ productos: result.productos });
  } else {
    res.status(500).json({ msg: "Error al traer los productos" });
  }
};

const obtenerUnProducto = async (req, res) => {
  /* req: Request -> header - body - params - query */
  const result = await serviciosProductos.obtenerProducto(
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ producto: result.producto });
  } else {
    res.status(500).json({ msg: "Error al traer el producto" });
  }
};

const crearUnProducto = async (req, res) => {
  const result = await serviciosProductos.nuevoProducto(req.body);

  if (result.statusCode === 201) {
    res.status(201).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al traer el producto" });
  }
};

const actualizarUnProducto = async (req, res) => {
  const result = await serviciosProductos.actualizarProducto(
    req.body,
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg, productos: result.productos });
  } else {
    res.status(500).json({ msg: "Error al traer el producto" });
  }
};

const borradoFisicoDelProducto = async (req, res) => {
  const result = await serviciosProductos.borrarProducto(req.params.idProducto);

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al traer el producto" });
  }
};

const agregarUnProductoAlCarrito = async (req, res) => {
  const result = await serviciosProductos.cargarProductoCarrito(
    req.idUsuario,
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 400) {
    res.status(400).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al agregar el producto al carrito" });
  }
};

const borrarUnProductoDelCarrito = async (req, res) => {
  const result = await serviciosProductos.borrarProductoCarrito(
    req.idUsuario,
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 400) {
    res.status(400).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al agregar el producto al carrito" });
  }
};

const agregarUnProductoAfavorito = async (req, res) => {
  const result = await serviciosProductos.cargarProductoFavorito(
    req.idUsuario,
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 400) {
    res.status(400).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al agregar el producto a Favorito" });
  }
};

const borrarUnProductoDeFavorito = async (req, res) => {
  const result = await serviciosProductos.borrarProductoFavorito(
    req.idUsuario,
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 400) {
    res.status(400).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al agregar el producto al carrito" });
  }
};

const obtenerProductosCarrito = async (req, res) => {
  const result = await serviciosProductos.obtenerProductosDelCarritoUsuario(
    req.idUsuario
  );

  if (result.statusCode === 200) {
    res.status(200).json({ productos: result.productos });
  } else {
    res.status(500).json({ msg: "Error al obtener los productos del carrito" });
  }
};

const obtenerProductosFavoritos = async (req, res) => {
  const result = await serviciosProductos.obtenerProductosDeFavoritosUsuario(
    req.idUsuario
  );

  if (result.statusCode === 200) {
    res.status(200).json({ productos: result.productos });
  } else {
    res.status(500).json({ msg: "Error al obtener los productos del carrito" });
  }
};

const agregarImagenProducto = async (req, res) => {
  const result = await serviciosProductos.agregarImagen(
    req.params.idProducto,
    req.file
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al agregar la imagen al producto" });
  }
};

const pagarProductos = async (req, res) => {
  const result = await serviciosProductos.pagarMercadoPago();

  if (result.statusCode === 200) {
    res.status(200).json({ url: result.url });
  }
};

const habilitarProducto = async (req, res) => {
  const result = await serviciosProductos.desbloquearProductoPorId(
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al habilitar al producto" });
  }
};

const deshabilitarProducto = async (req, res) => {
  const result = await serviciosProductos.bloquearProductoPorId(
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al deshabilitar al producto" });
  }
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  actualizarUnProducto,
  crearUnProducto,
  borradoFisicoDelProducto,
  agregarUnProductoAlCarrito,
  agregarUnProductoAfavorito,
  borrarUnProductoDelCarrito,
  borrarUnProductoDeFavorito,
  obtenerProductosCarrito,
  obtenerProductosFavoritos,
  agregarImagenProducto,
  pagarProductos,
  habilitarProducto,
  deshabilitarProducto,
};
