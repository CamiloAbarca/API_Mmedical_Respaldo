import Joi from 'joi'
import { CreateEquipoDTO, UpdateEquipoDTO } from '../dto/EquipoDTO'

export const createEquipoSchema: Joi.ObjectSchema<CreateEquipoDTO> = Joi.object().keys({
    marca: Joi.string().required(),
    modelo: Joi.string().required(),
    serieEquipo: Joi.string().required(),
    fechaIngreso: Joi.date().required(),
    fechaEntrega: Joi.date().required(),
    fechaMantencion: Joi.date().required(),
    detalle: Joi.string().required(),
    otroDetalle: Joi.string().required(),
    accesorios: Joi.string().required(),
    estado: Joi.string().required(),
    razonSocial: Joi.string().required(),
    centroMedico: Joi.string().required(),
    personaContacto: Joi.string().required(),
    fono: Joi.number().required(),
    email: Joi.string().required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
})

export const updateEquipoSchema: Joi.ObjectSchema<UpdateEquipoDTO> = Joi.object().keys({
    marca: Joi.string(),
    modelo: Joi.string(),
    serieEquipo: Joi.string(),
    fechaIngreso: Joi.date(),
    fechaEntrega: Joi.date(),
    fechaMantencion: Joi.date(),
    detalle: Joi.string(),
    otroDetalle: Joi.string(),
    accesorios: Joi.string(),
    estado: Joi.string(),
    razonSocial: Joi.string(),
    centroMedico: Joi.string(),
    personaContacto: Joi.string(),
    fono: Joi.number(),
    email: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
})