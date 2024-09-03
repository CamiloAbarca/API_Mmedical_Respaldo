import { Request, Response } from "express"
import { CreateEquipoDTO, EquipoDTO, UpdateEquipoDTO } from "../models/dto/EquipoDTO"
import { createEquipoSchema, updateEquipoSchema } from "../models/validators/equipoSchemas"
import EquipoRepository from "../models/repositories/EquipoRepository"
import { UserTokenPayload } from "../models/dto/UserDTO"


export default class EquipoController {
    public readonly getAll = async (req: Request, res: Response) => {
        const user = req.user as UserTokenPayload
        const repository = new EquipoRepository(user.sub)

        try {
            const equipos: EquipoDTO[] = await repository.findAll()
            res.json(equipos)
        } catch (error) {
            console.log(error)
            res.status(500).json({ messaje: 'Something went wrong' })
        }
    }

    public readonly getById = async (req: Request, res: Response) => {
        const { id } = req.params
        const user = req.user as UserTokenPayload
        const repository = new EquipoRepository(user.sub)

        try {
            const equipo = await repository.findById(parseInt(id))

            if (!equipo) {
                res.status(404).json({ message: 'Equipo not found' })
                return
            }
            res.json(equipo)
        } catch (error) {
            console.log(error)
            res.status(500).json({ messaje: 'Something went wrong' })
        }


    }

    public readonly create = async (req: Request, res: Response) => {
        const equipo = req.body as CreateEquipoDTO

        try {
            await createEquipoSchema.validateAsync(equipo)
        } catch (error) {
            res.status(400).json({ message: error.message })
            return
        }

        const user = req.user as UserTokenPayload
        const repository = new EquipoRepository(user.sub)

        try {
            const newEquipo = await repository.create(equipo)
            res.json(newEquipo)
        } catch (error) {
            if (error.code === 'P2002') {
                res.status(409).json({ message: 'Equipo already exists' })
                return
            }
            console.log(error)
            res.status(500).json({ message: 'Something went wrong' })
        }

        const newEquipo = await repository.create(equipo)

        res.json(newEquipo)

    }

    public readonly update = async (req: Request, res: Response) => {
        const { id } = req.params
        const equipo = req.body as UpdateEquipoDTO

        try {
            await updateEquipoSchema.validateAsync(equipo)
        } catch (error) {
            res.status(400).json({ message: error.message })
            return
        }

        const user = req.user as UserTokenPayload
        const repository = new EquipoRepository(user.sub)

        try {
            await repository.update(parseInt(id), equipo)
            res.sendStatus(204)
        } catch (error) {
            if (error.code === 'P2002') {
                res.status(409).json({ message: 'Equipo already exists' })
                return
            }
            console.log(error)
            res.status(500).json({ message: 'Something went wrong' })
        }


    }

    public readonly delete = async (req: Request, res: Response) => {
        const { id } = req.params

        const user = req.user as UserTokenPayload
        const repository = new EquipoRepository(user.sub)

        try {
            await repository.delete(parseInt(id))
            res.sendStatus(204)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Something went wrong' })
        }


    }
}