import ErroBase from "./ErroBase.js";

class ValidationError extends ErroBase{
  constructor(error){
    const errorsMessages = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");
    super(`Os seguintes erros foram encontrados: ${errorsMessages}`, 400);
  }
}

export default ValidationError;