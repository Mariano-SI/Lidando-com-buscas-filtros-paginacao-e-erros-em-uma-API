import ErroBase from "./ErroBase.js";

class NotFoundError extends ErroBase{
  constructor(message){
    super(message, 404);
  }
}

export default NotFoundError;