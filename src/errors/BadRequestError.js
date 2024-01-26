import ErroBase from "./ErroBase.js";

class BadRequestError extends ErroBase{
  constructor(message){
    super(message, 400);
  }
}

export default BadRequestError;