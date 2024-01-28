import {livro} from "../models/index.js";
import { autor } from "../models/index.js";
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

  static async listarLivrosPorFiltro(req, res, next){
    try {
      const {editora, titulo, minPags, maxPags, authorName} = req.query;

      const regex = new RegExp(titulo, "i");
      
      let search = {};

      if(editora) search.editora = editora;
  
      if(titulo) search.titulo = regex;

      if(minPags) search.paginas = {$gte: minPags};
      if(maxPags) search.paginas = {$lte: maxPags};

      if(authorName){
        const searchedAuthor = await autor.findOne({nome: authorName});

        if(!searchedAuthor){
          search = null;
        }else{
          search.autor =  searchedAuthor;
        }
      }
      
      if(search){
        const result = await livro.find(search);
        
        res.status(200).json(result);
        return;
      }
      
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;