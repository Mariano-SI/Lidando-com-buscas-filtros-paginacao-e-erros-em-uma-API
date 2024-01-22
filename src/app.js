import express from "express";
import databaseConnection from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await databaseConnection();

connection.on("error", (err) =>{
  console.error("Erro de conexão ", err);
});

connection.once("open", () =>{
  console.log("Conexão com o banco realizada com sucesso!");
});

const app = express();

routes(app);


export default app;