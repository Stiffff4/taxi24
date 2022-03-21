import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Conductor } from "@prisma/client";
import { PrismaData } from "../../prisma/prisma.data"; 
import { ValidationService } from "../../../services/Validation/validation.service";
import { DistanceData } from "../../../services/Distance/distance.data";

@Injectable()
export class ConductorData {

    constructor(
        private prisma: PrismaData, 
        private validar: ValidationService,
        private distancia: DistanceData
    ){}

    async obtenerConductoresDisponiblesCercanos(location: string){
        try{
            return await this.distancia.obtenerConductoresDisponiblesCercanos(location);
        }
        catch(error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerTodos(){
        try{
            return await this.prisma.conductor.findMany();
        }
        catch(error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerPorId(id: number){
        try{
            return await this.prisma.conductor.findFirst({where: {ID: id}});
        }
        catch (error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerConductoresDisponibles(){
        try {
            return await this.prisma.conductor.findMany({where: {Disponible: true}});
        }
        catch(error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async agregar(conductor: Conductor){
        try {
            return await this.prisma.conductor.create({data: conductor});
        } 
        catch (error) {
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async actualizar(conductor: Conductor, where: Object){
        try {
            return await this.prisma.conductor.update({
                where: where,
                data: conductor
            });
            
        } 
        catch (error) {
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminar(where: Object){
        try{
            return await this.prisma.conductor.delete({
                where: where
            });
        }
        catch(error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}