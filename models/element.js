const mongoose = require("mongoose");

const Element = mongoose.model("Element", {
  nome: String,
  simbolo: String,
  numeroAtomico: Number,
  massa: Number,
  protons: Number,
  eletrons: Number,
  neutrons: Number,
  grupo: String,
  distribuicaoEletronica: String,
  pontoFusao: String,
  pontoEbulicao: String,
});

module.exports = Element;
