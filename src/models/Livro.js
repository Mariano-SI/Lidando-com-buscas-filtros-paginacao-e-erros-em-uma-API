import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    titulo: {type: mongoose.Schema.Types.String, required: true},
    editora: {type: mongoose.Schema.Types.String},
    preco: {type: mongoose.Schema.Types.Number},
    paginas: {type: mongoose.Schema.Types.Number},
    autor: autorSchema
}, {versionKey: false});


const livro = mongoose.model("livros", livroSchema);

export default livro;