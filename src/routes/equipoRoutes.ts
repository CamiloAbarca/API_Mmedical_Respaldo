import { Router } from "express";
import EquipoController from "../controllers/EquipoController";

const equipoRouters = Router()
const controller = new EquipoController()

equipoRouters.get('/', controller.getAll)
equipoRouters.get('/:id', controller.getById)
equipoRouters.post('/', controller.create)
equipoRouters.put('/:id', controller.update)
equipoRouters.delete('/:id', controller.delete)

export default equipoRouters