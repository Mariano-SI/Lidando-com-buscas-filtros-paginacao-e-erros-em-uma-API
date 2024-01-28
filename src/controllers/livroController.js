import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";
import NotFoundError from "../errors/NotFoundErros.js";

class LivroController{
  constructor(){

  }

  static async listarLivros(req, res, next){
    try {
      const allBooks = await livro.find({});
      res.status(200).json(allBooks);
    } catch (error) {
      next(error);
    }
  }

  static async criaLivro(req, res, next){
    try {
      const {titulo, editora, preco, paginas, autorId} = req.body;

      const authorOfBook = await autor.findById(autorId);

      const novoLivro = await livro.create({titulo, editora, preco, paginas, autor: {...authorOfBook._doc} });

      res.status(201).json({
        message: "Livro criado com sucesso",
        livro: novoLivro
      });
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorId(req, res, next){
    try {
      const {id} = req.params;
      const livroBuscado = await livro.findById(id);

      if(!livroBuscado){
        throw new NotFoundError("O livro não foi encontrado");
      }
      res.status(200).json(livroBuscado);
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next){
    try {
      const {id} = req.params;

      const bookToUpdate = await livro.findById(id);

      if(!bookToUpdate){
        throw new NotFoundError("Livro não encontrado!");
      }
      
      await livro.findByIdAndUpdate(id, req.body);
      res.status(201).json({message: "Livro atualizado com sucesso!"});
    } catch (error) {
      next(error);
    }
  }

  static async deletarLivroPorId(req, res, next){
    try {
      const {id} = req.params;

      const bookToDelete = await livro.findById(id);

      if(!bookToDelete){
        throw new NotFoundError("Livro não encontrado!");
      }

      await livro.findByIdAndDelete(id);
      res.status(200).json({message: "Livro excluido com sucesso!"});
    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorEditora(req, res, next){
    try {
      const {editora} = req.query;

      const livrosPorEditora = await livro.find({editora});

      res.status(200).json(livrosPorEditora);
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;