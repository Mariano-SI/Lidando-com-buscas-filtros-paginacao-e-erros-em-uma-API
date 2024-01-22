import {autor} from "../models/Autor.js";

class AutorController{
  constructor(){

  }

  static async listarAutores(req, res){
    try {
      const allAuthors = await autor.find({});
      res.status(200).json(allAuthors);
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha ao buscar autores`});
    }
  }

  static async criaAutor(req, res){

    try {
      const novoAutor = await autor.create(req.body);

      res.status(201).json({
        message: "Autor cadastrado com sucesso",
        autor: novoAutor
      });
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha ao cadastrar autor`});
    }
  }

  static async listarAutorPorId(req, res){
    try {
      const {id} = req.params;
      const autorBuscado = await autor.findById(id);
      res.status(200).json(autorBuscado);
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha ao buscar autor`});
    }
  }

  static async atualizarAutor(req, res){
    try {
      const {id} = req.params;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(201).json({message: "Autor atualizado com sucesso!"});
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha ao atualizar autor.`});
    }
  }

  static async deletarAutorPorId(req, res){
    try {
      const {id} = req.params;
      await autor.findByIdAndDelete(id);
      res.status(200).json({message: "Autor excluido com sucesso!"});
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha ao excluir autor.`});
    }
  }
}

export default AutorController;