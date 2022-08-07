const mongoose = require("mongoose");

const Element = mongoose.model("Element", {
  nome: String,
  simbolo: String,
  numeroAtomico: Number,
  massa: Number,
  protons: Number,
  eletrons: Number,
  distribuicaoEletronica: String,
  pontoFusao: String,
  pontoEbulicao: String,
});
