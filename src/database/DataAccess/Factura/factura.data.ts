import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Conductor, Factura, Pasajero, Viaje } from "@prisma/client";
import { PrismaData } from "../../prisma/prisma.data"; 
import { ValidationService } from "../../../services/Validation/validation.service";

@Injectable()
export class FacturaData {
    constructor(private prisma: PrismaData, private validator: ValidationService){}

    async generarFactura(pasajero: Pasajero, conductor: Conductor, viaje: Viaje){
        const pesosPorMinuto: number = 7.75;
        const precioFinal = viaje.Duracion*pesosPorMinuto;

        await this.prisma.factura.create({
            data: {
                "IDViaje": viaje.ID,
                "Precio": precioFinal
            }
        });

        return this.GenerarFacturaDeViaje(pasajero, conductor, viaje, precioFinal);
    }

    async obtenerTodos(){
        try{
            return await this.prisma.factura.findMany();
        }
        catch(error){
            this.validator.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerPorId(id: number){
        try{
            return await this.prisma.factura.findFirst({where: {ID: id}});
        }
        catch (error){
            this.validator.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async agregar(factura: Factura){
        try {
            return await this.prisma.factura.create({data: factura});
        } 
        catch (error) {
            this.validator.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async actualizar(factura: Factura, where: Object){
        try {
            return await this.prisma.factura.update({
                where: where,
                data: factura
            });
            
        } 
        catch (error) {
            this.validator.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async borrar(where: Object){
        try{
            return await this.prisma.factura.delete({
                where: where
            });
        }
        catch(error){
            this.validator.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //#region MetodosPrivados
    
    private GenerarFacturaDeViaje(pasajero: Pasajero, conductor: Conductor, viaje: Viaje, precio: number){
        return {
            "Factura": {
                "Total": precio + " DOP",
                "Fecha": viaje.FechaInicio.toLocaleDateString(),
                "UbicacionOrigen": pasajero.Ubicacion,
                "UbicacionDestino": viaje.UbicacionDestino,
                "Duracion": viaje.Duracion+" minutos",
                "DistanciaRecorrida": viaje.DistanciaRecorridaKM+" KM",
                "Valoracion": viaje.Valoracion,
                "Pasajero": {
                    "Nombre": pasajero.Nombre,
                    "Apellido": pasajero.Apellido
                },
                "Conductor": {
                    "Nombre": conductor.Nombre,
                    "Apellido": conductor.Apellido,
                }
            }
        }
    }

    //#endregion MetodosPrivados
}