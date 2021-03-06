import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ValidationService } from "../../../services/Validation/validation.service";
import { Vehiculo } from "@prisma/client"; 
import { PrismaData } from "../../prisma/prisma.data";

@Injectable()
export class VehiculoData {

    constructor(
        private validator: ValidationService,
        private prisma: PrismaData
    ){}

    async obtenerTodos(){
        try{
            return await this.prisma.vehiculo.findMany({orderBy: {ID: 'asc'}})
        }
        catch(error){
            this.validator.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerPorId(id: number){
        try{
            return await this.prisma.vehiculo.findFirst({where: {ID: id}});
        }
        catch (error){
            this.validator.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async agregar(vehiculo: Vehiculo){
        try {
            return await this.prisma.vehiculo.create({data: vehiculo});
        } 
        catch (error) {
            this.validator.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async actualizar(vehiculo: Vehiculo, id: number){
        try {
            return await this.prisma.vehiculo.update({
                where: {ID: id},
                data: vehiculo
            });
        } 
        catch (error) {
            this.validator.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminar(id: number){
        try{
            return await this.prisma.vehiculo.delete({
                where: {ID: id}
            });
        }
        catch(error){
            this.validator.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}