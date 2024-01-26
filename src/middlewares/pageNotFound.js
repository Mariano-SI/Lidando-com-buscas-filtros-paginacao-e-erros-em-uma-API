import NotFoundError from "../errors/NotFoundErros.js";

function pageNotFound(req, res, next){
  const error404 = new NotFoundError("Página não encontrada");
  next(error404);
}

export default pageNotFound;