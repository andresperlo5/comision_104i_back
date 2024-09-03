const CartModel = require("../models/carrito.schema");
const FavModel = require("../models/favoritos.schema");
const ProductModel = require("../models/producto.schema");
const UsersModel = require("../models/usuarios.schema");
const cloudinary = require("../helpers/cloudinary.config");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const obtenerProductos = async () => {
  const productos = await ProductModel.find();
  return {
    productos,
    statusCode: 200,
  };
};

const obtenerProducto = async (idProducto) => {
  const producto = await ProductModel.findOne({ _id: idProducto });
  return {
    producto,
    statusCode: 200,
  };
};

const nuevoProducto = async (body) => {
  const nuevoProducto = new ProductModel(body);
  await nuevoProducto.save();

  return {
    msg: "Producto creado con exito",
    statusCode: 201,
  };
};

const actualizarProducto = async (body, idProducto) => {
  await ProductModel.findByIdAndUpdate({ _id: idProducto }, body);
  const productos = await ProductModel.find();
  return {
    msg: "Producto actualizado",
    productos,
    statusCode: 200,
  };
};

const borrarProducto = async (idProducto) => {
  await ProductModel.findByIdAndDelete({ _id: idProducto });

  return {
    msg: "Producto eliminado",
    statusCode: 200,
  };
};

const cargarProductoCarrito = async (idUsuario, idProducto) => {
  const usuario = await UsersModel.findById(idUsuario);
  const producto = await ProductModel.findById(idProducto);
  const carrito = await CartModel.findOne({ _id: usuario.idCarrito });

  const productoExiste = carrito.productos.find(
    (prod) => prod?._id.toString() === idProducto.toString()
  );

  if (productoExiste) {
    return {
      msg: "Producto ya existe en el carrito",
      statusCode: 400,
    };
  }
  console.log(producto);
  carrito.productos.push(producto);
  await carrito.save();

  return {
    msg: "Producto cargado en el carrito",
    statusCode: 200,
  };
};

const borrarProductoCarrito = async (idUsuario, idProducto) => {
  const usuario = await UsersModel.findById(idUsuario);
  const carrito = await CartModel.findOne({ _id: usuario.idCarrito });
  const posicionProducto = carrito.productos.findIndex(
    (prod) => prod?._id.toString() === idProducto.toString()
  );

  carrito.productos.splice(posicionProducto, 1);
  await carrito.save();

  return {
    msg: "Producto eliminado del carrito",
    statusCode: 200,
  };
};

const cargarProductoFavorito = async (idUsuario, idProducto) => {
  const usuario = await UsersModel.findById(idUsuario);
  const producto = await ProductModel.findById(idProducto);
  const favorito = await FavModel.findOne({ _id: usuario.idFavorito });

  const productoExiste = favorito.productos.find(
    (prod) => prod?._id.toString() === idProducto.toString()
  );

  if (productoExiste) {
    return {
      msg: "Producto ya existe en Favoritos",
      statusCode: 400,
    };
  }
  console.log(producto);
  favorito.productos.push(producto);
  await favorito.save();

  return {
    msg: "Producto cargado en Favoritos",
    statusCode: 200,
  };
};

const borrarProductoFavorito = async (idUsuario, idProducto) => {
  const usuario = await UsersModel.findById(idUsuario);
  const favorito = await FavModel.findOne({ _id: usuario.idFavorito });
  const posicionProducto = favorito.productos.findIndex(
    (prod) => prod?._id.toString() === idProducto.toString()
  );

  favorito.productos.splice(posicionProducto, 1);
  await favorito.save();

  return {
    msg: "Producto eliminado de Favoritos",
    statusCode: 200,
  };
};

const obtenerProductosDelCarritoUsuario = async (idUsuario) => {
  const usuario = await UsersModel.findById(idUsuario);
  const carrito = await CartModel.findOne({ _id: usuario.idCarrito });
  return {
    productos: carrito.productos,
    statusCode: 200,
  };
};

const obtenerProductosDeFavoritosUsuario = async (idUsuario) => {
  const usuario = await UsersModel.findById(idUsuario);
  const favorito = await FavModel.findOne({ _id: usuario.idFavorito });
  return {
    productos: favorito.productos,
    statusCode: 200,
  };
};

const agregarImagen = async (idProducto, file) => {
  const producto = await ProductModel.findById(idProducto);
  const imagen = await cloudinary.uploader.upload(file.path);
  producto.imagen = imagen.url;

  await producto.save();

  return {
    msg: "Imagen cargada",
    statusCode: 200,
  };
};

const pagarMercadoPago = async (body) => {
  const cliente = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  const preference = new Preference(cliente);

  const result = await preference.create({
    body: {
      items: [
        {
          title: "producto 1",
          quantity: 1,
          unit_price: 10000,
          currency_id: "ARS",
        },
        {
          title: "producto 2",
          quantity: 1,
          unit_price: 15000,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:5173/user/cart",
        failure: "http://localhost:5173/user/cart",
        pending: "http://localhost:5173/user/cart",
      },
      auto_return: "approved",
    },
  });

  console.log(result);

  /* return { usar cuando quieran el boton de la wallet en el front
    url: result.id,
    statusCode: 200,
  }; */
  // usar cuando hagan la redireccion a mercadopago
  return {
    url: result.init_point,
    statusCode: 200,
  };
};

const bloquearProductoPorId = async (idProducto) => {
  const producto = await ProductModel.findById(idProducto);
  producto.bloqueado = true;
  await producto.save();

  return {
    msg: "Producto bloqueado",
    statusCode: 200,
  };
};

const desbloquearProductoPorId = async (idProducto) => {
  const producto = await ProductModel.findById(idProducto);
  producto.bloqueado = false;
  await producto.save();

  return {
    msg: "producto habilitado",
    statusCode: 200,
  };
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  nuevoProducto,
  actualizarProducto,
  borrarProducto,
  cargarProductoCarrito,
  cargarProductoFavorito,
  borrarProductoCarrito,
  borrarProductoFavorito,
  obtenerProductosDelCarritoUsuario,
  obtenerProductosDeFavoritosUsuario,
  agregarImagen,
  pagarMercadoPago,
  bloquearProductoPorId,
  desbloquearProductoPorId,
};
