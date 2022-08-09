const express = require("express");
const mongoose = require("mongoose");
const Element = require("./models/element");

const app = express();

const PORT = 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/elementos", async (req, res) => {
  try {
    const elementos = await Element.find();

    res.status(200).json(elementos);
  } catch (err) {
    console.log(err);
  }
});

app.get("/elementos/:nome", async (req, res) => {
  const nome = req.params.nome;

  try {
    const element = await Element.findOne({ nome: nome });

    res.status(200).json(element);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/elementos", async (req, res) => {
  const {
    nome,
    simbolo,
    numeroAtomico,
    massa,
    protons,
    eletrons,
    distribuicaoEletronica,
    pontoFusao,
    pontoEbulicao,
  } = req.body;

  const element = {
    nome,
    simbolo,
    numeroAtomico,
    massa,
    protons,
    eletrons,
    distribuicaoEletronica,
    pontoFusao,
    pontoEbulicao,
  };

  try {
    await Element.create(element);

    res.status(201).json({ message: "Elemento adicionado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch("/elementos/:nome", async (req, res) => {
  const nomeElemento = req.params.nome;

  const {
    nome,
    simbolo,
    numeroAtomico,
    massa,
    protons,
    eletrons,
    distribuicaoEletronica,
    pontoFusao,
    pontoEbulicao,
  } = req.body;

  const element = {
    nome,
    simbolo,
    numeroAtomico,
    massa,
    protons,
    eletrons,
    distribuicaoEletronica,
    pontoFusao,
    pontoEbulicao,
  };

  const one = await Element.findOne({ nome: nomeElemento });

  if (!one) {
    res.status(404).json({ message: "Não há elemento com este nome." });
    return;
  }

  try {
    await Element.updateOne({ nome: nomeElemento }, element);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/elementos/:nome", async (req, res) => {
  const nome = req.body.nome;

  const elemento = await Element.findOne({ nome: nome });

  if (!elemento) {
    res.status(404).json({ message: "Não há elemento com esse nome." });
    return;
  }

  await Element.deleteOne({ nome: nome });
});

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://myckwilliam:81250044@novobanco.ubrbecd.mongodb.net/periodic?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database conection established");

    app.listen(PORT, (err) => {
      console.log("Server listening on port " + PORT);
      err && console.log(err);
    });
  });
