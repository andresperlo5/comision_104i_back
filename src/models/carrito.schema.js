const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  idUsuario: {
    type: String,
  },
  productos: [],
});

const CartModel = model("cart", CartSchema);
module.exports = CartModel;
