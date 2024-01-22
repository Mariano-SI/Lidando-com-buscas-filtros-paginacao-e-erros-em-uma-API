import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController{
    constructor(){

    }

    static async listarLivros(req, res){
        try {
            const allBooks = await livro.find({});
            res.status(200).json(allBooks);
        } catch (error) {
            res.status(500).json({message: `${error.message} - falha ao buscar livros`})
        }
    }

    static async criaLivro(req, res){
        try {
            const {titulo, editora, preco, paginas, autorId} = req.body;

            const authorOfBook = await autor.findById(autorId);

            const novoLivro = await livro.create({titulo, editora, preco, paginas, autor: {...authorOfBook._doc} });

            res.status(201).json({
                message: "Livro criado com sucesso",
                livro: novoLivro
            });
        } catch (error) {
            res.status(500).json({message: `${error.message} - falha ao cadastrar livro`})
        }
    }

    static async listarLivroPorId(req, res){
        try {
            const {id} = req.params;
            const livroBuscado = await livro.findById(id);
            res.status(200).json(livroBuscado);
        } catch (error) {
            res.status(500).json({message: `${error.message} - falha ao buscar livro`})
        }
    }

    static async atualizarLivro(req, res){
        try {
            const {id} = req.params;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(201).json({message: "Livro atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({message: `${error.message} - falha ao atualizar livro.`})
        }
    }

    static async deletarLivroPorId(req, res){
        try {
            const {id} = req.params;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: "Livro excluido com sucesso!"});
        } catch (error) {
            res.status(500).json({message: `${error.message} - falha ao excluir livro.`})
        }
    }

    static async listarLivrosPorEditora(req, res){
        try {
            const {editora} = req.query;

            const livrosPorEditora = await livro.find({editora});

            res.status(200).json(livrosPorEditora);
        } catch (error) {
            res.status(500).json({message: `${error.message} - falha ao buscar livros.`})
        }
    }
};

export default LivroController;