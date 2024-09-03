const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  imagen: {
    type: String,
    default: "",
    trim: true,
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
});

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
