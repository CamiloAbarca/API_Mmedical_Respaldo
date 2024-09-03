import { Request, Response } from "express"
import { CreateEquipoDTO, EquipoDTO, UpdateEquipoDTO } from "../models/dto/EquipoDTO"
import { createEquipoSchema, updateEquipoSchema } from "../models/validators/equipoSchemas"
import EquipoRepository from "../models/repositories/EquipoRepository"
import { UserTokenPayload } from "../models/dto/UserDTO"


export default class EquipoController {
    public readonly getAll = async (req: Request, res: Response) => {
        const user = req.user as UserTokenPayload
        const repository = new EquipoRepository(user.sub)
        const equipos: EquipoDTO[] = await repository.findAll()
        res.json(equipos)
    }

    public readonly getById = async (req: Request, res: Response) => {
        const { id } = req.params
        const user = req.user as UserTokenPayload
        const repository = new EquipoRepository(user.sub)
        const equipo = await repository.findById(parseInt(id))
        res.json(equipo)
    }

    public readonly create = async (req: Request, res: Response) => {
        const equipo = req.body as CreateEquipoDTO

        try {
            await createEquipoSchema.validateAsync(equipo)
        } catch(error) {
            res.status(400).json({ message: error.message })
            return
        }

        const user = req.user as UserTokenPayload
        const repository = new EquipoRepository(user.sub)

        const newEquipo = await repository.create(equipo)

        res.json(newEquipo)

    }

    public readonly update = async (req: Request, res: Response) => {
        const { id } = req.params
        const equipo = req.body as UpdateEquipoDTO

        try {
            await updateEquipoSchema.validateAsync(equipo)
        } catch(error) {
            res.status(400).json({ message: error.message })
            return
        }

        const user = req.user as UserTokenPayload
        const repository = new EquipoRepository(user.sub)
        await repository.update(parseInt(id), equipo)
        res.sendStatus(204)

    }

    public readonly delete = async (req: Request, res: Response) => {
        const { id } = req.params
        
        const user = req.user as UserTokenPayload
        const repository = new EquipoRepository(user.sub)
        await repository.delete(parseInt(id))
        res.sendStatus(204)

    }
}