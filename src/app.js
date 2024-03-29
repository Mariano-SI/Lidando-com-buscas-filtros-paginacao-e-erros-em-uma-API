import express from "express";
import databaseConnection from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorsHandler from "./middlewares/errorsHandler.js";
import pageNotFound from "./middlewares/pageNotFound.js";

const connection = await databaseConnection();

connection.on("error", (err) =>{
  console.error("Erro de conexão ", err);
});

connection.once("open", () =>{
  console.log("Conexão com o banco realizada com sucesso!");
});

const app = express();

routes(app);

app.use(pageNotFound);

app.use(errorsHandler);

export default app;