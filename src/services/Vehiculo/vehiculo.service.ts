import { Injectable } from "@nestjs/common";
import { Vehiculo } from "@prisma/client"; 
import { VehiculoData } from "../../database/DataAccess/Vehiculo/vehiculo.data";
import { ValidationService } from "../Validation/validation.service";

@Injectable()
export class VehiculoService{
    constructor(private data: VehiculoData, private validar: ValidationService){}

    async obtenerTodos(){      
        try {
            const data = await this.data.obtenerTodos();

            this.validar.sinDatosArray(data);

            return data;
        }
        catch(error){
            throw error;
        }
    }

    async obtenerPorId(id: number){   
        try {
            this.validar.idInvalido(id);
            
            const data = await this.data.obtenerPorId(id);

            this.validar.sinDatos(data);

            return data;
        }
        catch(error){
            throw error;
        }
    }

    async agregar(vehiculo: Vehiculo){
        try {
            this.validar.cuerpoVacio(vehiculo);
            this.validar.arrayVacioNulo(Object.values(vehiculo));

            return await this.data.agregar(vehiculo);
        } 
        catch (error) {
            throw error;
        }
    }

    async actualizar(body: any, id: number){
        try {
            this.validar.cuerpoVacio(body);
            this.validar.arrayVacioNulo(Object.values(body));
            this.validar.idInvalido(id);

            return await this.data.actualizar(body, id);
        } 
        catch (error) {
            throw error;
        }
    }

    async eliminar(id: number){
        try {
            this.validar.idInvalido(id);

            return await this.data.eliminar(id);
        } 
        catch (error) {
            throw error;
        }
    }
}