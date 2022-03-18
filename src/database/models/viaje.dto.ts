export interface ViajeDTO {
    ID: number
    UbicacionDestino: string
    FechaInicio: Date
    FechaFin: Date
    Duracion: number
    DistanciaRecorridaKM: number
    Activo: boolean
    Completado: boolean
    MetodoPago: string
    Valoracion?: number
}