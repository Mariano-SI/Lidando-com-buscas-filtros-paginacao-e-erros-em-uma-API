import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorsHandler(error, req, res, next){

  console.error(error);

  if(error instanceof mongoose.Error.CastError){
    return res.status(400).json({message: "Um ou mais dados fornecidos estão incorretos"});
  }else if(error instanceof mongoose.Error.ValidationError){

    const errorsMessages = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");

    console.log(errorsMessages);


    return res.status(400).json({message: `Os seguintes erros foram encontrados: ${errorsMessages}`});
  }
  return res.status(500).json({message: "Erro interno de servidor."});
    
}

export default errorsHandler;