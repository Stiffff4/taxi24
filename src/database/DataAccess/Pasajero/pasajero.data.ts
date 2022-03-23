import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Pasajero } from "@prisma/client";
import { PrismaData } from "../../prisma/prisma.data"; 
import { ValidationService } from "../../../services/Validation/validation.service";
import { DistanceData } from "../Distance/distance.data";

@Injectable()
export class PasajeroData {
    constructor(
        private prisma: PrismaData, 
        private validar: ValidationService,
        private distancia: DistanceData
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

    async obtenerTodos(){
        try{
            return await this.prisma.pasajero.findMany({orderBy: {ID: 'asc'}});
        }
        catch(error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerPorId(id: number){
        try{
            return await this.prisma.pasajero.findFirst({where: {ID: id}});
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

    async actualizar(pasajero: Pasajero, id: number){
        try {
            return await this.prisma.pasajero.update({
                where: {ID: id},
                data: pasajero
            });
            
        } 
        catch (error) {
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminar(id: number){
        try{
            return await this.prisma.pasajero.delete({
                where: {ID: id}
            });
        }
        catch(error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}