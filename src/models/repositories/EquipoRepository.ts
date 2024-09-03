import { PrismaClient } from '@prisma/client';
import { CreateEquipoDTO, EquipoDTO, UpdateEquipoDTO } from '../dto/EquipoDTO';

const prisma = new PrismaClient() 

export default class EquipoRepository {
    private userId: number

    constructor(userId: number) {
        this.userId = userId
    }

    public readonly findAll = async (): Promise<EquipoDTO[]> => {
        const equipos = await prisma.equipos.findMany({
            where: {
                userId: this.userId
            }
        })
        return equipos
    }

    public readonly findById = async (id: number): Promise<EquipoDTO | undefined> => {
        const equipo = await prisma.equipos.findFirst({
            where: {
                id,
                userId: this.userId
            }
        })

        if (!equipo) return

        return equipo
    }

    public readonly create = async (equipo: CreateEquipoDTO): Promise<EquipoDTO> => {
        const newEquipo = await prisma.equipos.create({
            data: {
                ...equipo,
                userId: this.userId,
                fechaIngreso: new Date(equipo.fechaIngreso).toISOString(),
                fechaEntrega: new Date(equipo.fechaEntrega).toISOString(),
                fechaMantencion: new Date(equipo.fechaMantencion).toISOString()
            }
        })

        return newEquipo
    }

    public readonly update = async (id: number, equipo: UpdateEquipoDTO): Promise<void> => {
        await prisma.equipos.updateMany({
            where: {
                id,
                userId: this.userId
            },
            data: {
                ...equipo,
                fechaIngreso: equipo.fechaIngreso ? new Date(equipo.fechaIngreso).toISOString() : undefined,
                fechaEntrega: equipo.fechaEntrega ? new Date(equipo.fechaEntrega).toISOString() : undefined,
                fechaMantencion: equipo.fechaMantencion ? new Date(equipo.fechaMantencion).toISOString() : undefined
            }
        })
    }

    public readonly delete = async (id: number) => {
        await prisma.equipos.deleteMany({
            where: {
                id,
                userId: this.userId
            }
        })
    }

}