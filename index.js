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
    console.log(err);
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
    console.log(err);
  }
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
