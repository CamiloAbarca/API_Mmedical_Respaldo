interface BaseEquipoDTO {
    id?: number
    marca: string
    modelo: string
    serieEquipo: string
    fechaIngreso: Date
    fechaEntrega: Date
    fechaMantencion: Date
    detalle: string
    otroDetalle: string
    accesorios: string
    estado: string
    razonSocial: string
    centroMedico: string
    personaContacto: string
    fono: number
    email: string
}

export interface EquipoDTO extends BaseEquipoDTO {
    id: number
    userId: number | null
}

export interface CreateEquipoDTO extends BaseEquipoDTO {}

export interface UpdateEquipoDTO extends Partial<BaseEquipoDTO>{}

