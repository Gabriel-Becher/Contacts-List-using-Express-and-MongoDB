require("dotenv").config(); // configura variaveis de ambiente
//imports basicos
const express = require("express");
const favicon = require("express-favicon");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONN1)
  .then(() => {
    app.emit("ready");
  })
  .catch((e) => {
    console.log(e);
  });
// diz ao app para ler json=>{}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const path = require("path");
const router = require("./routes");
// define a pasta de views
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.set("views", path.resolve(__dirname, "src", "Views"));
app.set("view engine", "ejs");
// usa o router para as rotas definidas
app.use(router);
//ouve o backend na porta 3000 padrão

app.on("ready", () => {
  app.listen(process.env.PORT, () => {
    console.log(`Link de Acesso: http://localhost:${process.env.PORT}`);
  });
});
