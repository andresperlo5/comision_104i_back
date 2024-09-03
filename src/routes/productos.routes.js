const express = require("express");
const router = express.Router();
const {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  crearUnProducto,
  actualizarUnProducto,
  borradoFisicoDelProducto,
  agregarUnProductoAlCarrito,
  agregarUnProductoAfavorito,
  borrarUnProductoDeFavorito,
  borrarUnProductoDelCarrito,
  obtenerProductosCarrito,
  obtenerProductosFavoritos,
  agregarImagenProducto,
  pagarProductos,
  deshabilitarProducto,
  habilitarProducto,
} = require("../controllers/productos.controllers");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

/* GET - R - Read - Solo obtener  - Todos los productos*/
/* GET - Un Producto */
router.get("/todosProductosCarrito", auth("user"), obtenerProductosCarrito);
router.get("/todosProductosFavoritos", auth("user"), obtenerProductosFavoritos);
router.get("/", obtenerTodosLosProductos);
router.get("/:idProducto", obtenerUnProducto);
/* POST - Crear un producto */
router.post("/", auth("admin"), crearUnProducto);
router.post(
  "/agregarProductoCarrito/:idProducto",
  auth("user"),
  agregarUnProductoAlCarrito
);
router.post(
  "/agregarProductoFavorito/:idProducto",
  auth("user"),
  agregarUnProductoAfavorito
);
/* PUT - Actualizar un producto */
router.put("/deshabilitar/:idProducto", auth("admin"), deshabilitarProducto);
router.put("/habilitar/:idProducto", auth("admin"), habilitarProducto);

router.put("/:idProducto", auth("admin"), actualizarUnProducto);
/* DELETE  - Borrar un producto*/
router.delete("/:idProducto", auth("admin"), borradoFisicoDelProducto);
router.delete(
  "/borrarProductoFavorito/:idProducto",
  auth("user"),
  borrarUnProductoDeFavorito
);
router.delete(
  "/borrarProductoCarrito/:idProducto",
  auth("user"),
  borrarUnProductoDelCarrito
);

router.post(
  "/agregarImagen/:idProducto",
  multer.single("image"),
  agregarImagenProducto
);

router.post("/pagarCarritoProductos", auth("user"), pagarProductos);

module.exports = router;
