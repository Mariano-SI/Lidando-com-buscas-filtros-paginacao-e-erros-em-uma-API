import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  titulo: {
    type: mongoose.Schema.Types.String, 
    required: [true, "O título do livro é obrigatório."]
  },
  editora: {
    type: mongoose.Schema.Types.String,
    required: [true, "O nome da editora é obrigatório."]
  },
  preco: {type: mongoose.Schema.Types.Number},
  paginas: {type: mongoose.Schema.Types.Number},
  autor: {
    type: autorSchema,
    required: [true, "O autor é obrigatório."]
  }
}, {versionKey: false});


const livro = mongoose.model("livros", livroSchema);

export default livro;