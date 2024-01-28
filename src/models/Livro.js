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
    required: [true, "O nome da editora é obrigatório."],
    /* enum: {
      values: ["Casa do codigo", "Alura"],
      message: "A editora {VALUE} não é um valor permitido."
    }  */
  },
  preco: {type: mongoose.Schema.Types.Number},
  paginas: {
    type: mongoose.Schema.Types.Number,
    validate: {
      validator: (value) => {
        return value >= 10 && value <= 5000;
      },
      message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
    }
  },
  autor: {
    type: autorSchema,
    required: [true, "O autor é obrigatório."]
  }
}, {versionKey: false});


const livro = mongoose.model("livros", livroSchema);

export default livro;