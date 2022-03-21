import { Injectable } from "@nestjs/common";
import { Factura } from "@prisma/client";
import { FacturaData } from "../../database/DataAccess/Factura/factura.data"; 
import { ValidationService } from "../Validation/validation.service";

@Injectable()
export class FacturaService {
    constructor(private data: FacturaData, private validar: ValidationService){}

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

    async agregar(factura: Factura){
        try {
            this.validar.cuerpoVacio(factura);
            this.validar.arrayVacioNulo(Object.values(factura));

            return await this.data.agregar(factura);
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