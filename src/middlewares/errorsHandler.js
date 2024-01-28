import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";
import BadRequestError from "../errors/BadRequestError.js";
import ValidationError from "../errors/ValidationError.js";
import NotFoundError from "../errors/NotFoundErros.js";

// eslint-disable-next-line no-unused-vars
function errorsHandler(error, req, res, next){

  console.error(error);

  if(error instanceof mongoose.Error.CastError){
    new BadRequestError("Um o mais dados fornecidos estão incorretos.").sendResponse(res);
  }else if(error instanceof mongoose.Error.ValidationError){
    new ValidationError(error).sendResponse(res);
  }else if(error instanceof NotFoundError){
    error.sendResponse(res);
  }else{
    new ErroBase().sendResponse(res);
  }
  
    
}

export default errorsHandler;