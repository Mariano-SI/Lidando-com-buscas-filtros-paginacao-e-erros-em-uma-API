import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorsHandler(error, req, res, next){

  console.error(error);

  if(error instanceof mongoose.Error.CastError){
    return res.status(400).json({message: "Um ou mais dados fornecidos estão incorretos"});
  }
  return res.status(500).json({message: "Erro interno de servidor."});
    
}

export default errorsHandler;