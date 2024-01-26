import express from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router();

routes.get("/books", LivroController.listarLivros);

routes.get("/books/busca", LivroController.listarLivrosPorEditora);

routes.get("/books/:id", LivroController.listarLivroPorId);

routes.post("/books", LivroController.criaLivro);

routes.put("/books/:id", LivroController.atualizarLivro);

routes.delete("/books/:id", LivroController.deletarLivroPorId);

export default routes;