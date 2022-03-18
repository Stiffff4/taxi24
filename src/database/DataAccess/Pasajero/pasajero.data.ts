import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Pasajero } from "@prisma/client";
import { PrismaData } from "../../prisma/prisma.data"; 
import { ValidationService } from "../../../services/Validation/validation.service";
import { DistanceService } from "../../../services/Distance/distance.service";

@Injectable()
export class PasajeroData {
    constructor(
        private prisma: PrismaData, 
        private validar: ValidationService,
        private distancia: DistanceService
    ){}

    async obtenerConductoresDisponiblesCercanos(ubicacion: string){
        try {
            return await this.distancia.obtenerConductoresDisponiblesCercanos(ubicacion, 3);
        } 
        catch (error) {
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerMuchos(where?: Object){
        try{
            return await this.prisma.pasajero.findMany({where: where});
        }
        catch(error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerUno(where: Object){
        try{
            return await this.prisma.pasajero.findFirst({where: where});
        }
        catch (error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async agregar(pasajero: Pasajero){
        try {
            return await this.prisma.pasajero.create({data: pasajero});
        } 
        catch (error) {
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async actualizar(pasajero: Pasajero, where: Object){
        try {
            return await this.prisma.pasajero.update({
                where: where,
                data: pasajero
            });
            
        } 
        catch (error) {
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminar(where: Object){
        try{
            return await this.prisma.pasajero.delete({
                where: where
            });
        }
        catch(error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}