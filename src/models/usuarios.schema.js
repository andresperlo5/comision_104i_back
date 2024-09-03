const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  emailUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  contrasenia: {
    type: String,
    required: true,
    trim: true,
    //select: false,
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
  rol: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  idCarrito: {
    type: String,
  },
  idFavorito: {
    type: String,
  },
});

UsersSchema.methods.toJSON = function () {
  const { contrasenia, ...usuario } = this.toObject();
  return usuario;
};

const UsersModel = model("user", UsersSchema);
module.exports = UsersModel;
