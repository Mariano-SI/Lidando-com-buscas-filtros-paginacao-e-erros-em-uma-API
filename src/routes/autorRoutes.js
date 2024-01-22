import express from "express";
import AutorController from "../controllers/autorController.js";

const routes = express.Router();

routes.get("/authors", AutorController.listarAutores);

routes.get("/authors/:id", AutorController.listarAutorPorId);

routes.post("/authors", AutorController.criaAutor);

routes.put("/authors/:id", AutorController.atualizarAutor);

routes.delete("/authors/:id", AutorController.deletarAutorPorId);

export default routes;