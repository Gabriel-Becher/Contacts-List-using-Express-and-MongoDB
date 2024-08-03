require("dotenv").config(); // configura variaveis de ambiente

//imports basicos
const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes.js");

// define a pasta de views
app.set("views", path.resolve(__dirname, "src", "Views"));
app.set("view engine", "ejs");
// usa o router para as rotas definidas
app.use(router);

//ouve o backend na porta 3000 padrão
app.listen(process.env.PORT, () => {
  console.log(`Link de Acesso: http://localhost:${process.env.PORT}`);
});
