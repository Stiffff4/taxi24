import { Injectable } from "@nestjs/common";
import { Factura } from "@prisma/client";
import { FacturaData } from "../../database/DataAccess/Factura/factura.data"; 
import { ValidationService } from "../Validation/validation.service";

@Injectable()
export class FacturaService {
    constructor(private data: FacturaData, private validar: ValidationService){}

    async obtenerMuchos(where?: Object){
        
        try {
            this.validar.arrayVacioNulo(Object.values(where));

            const data = await this.data.obtenerMuchos(where);

            this.validar.sinDatosArray(data);

            return data;
        }
        catch(error){
            throw error;
        }
    }

    async obtenerUno(where: Object){
        
        try {
            this.validar.cuerpoVacio(where);
            this.validar.arrayVacioNulo(Object.values(where));

            const data = await this.data.obtenerUno(where);

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

    async actualizar(body: any){

        try {
            this.validar.cuerpoVacio(body);
            this.validar.propiedadesIncorrectas(body, ['where', 'factura'])
            this.validar.arrayVacioNulo(Object.values(body.where));
            this.validar.arrayVacioNulo(Object.values(body.factura));

            return await this.data.actualizar(body.factura, body.where);
        } 
        catch (error) {
            throw error;
        }
    }

    async eliminar(where: Object){

        try {
            this.validar.cuerpoVacio(where);
            this.validar.arrayVacioNulo(Object.values(where));

            return await this.data.borrar(where);
        } 
        catch (error) {
            throw error;
        }
    }
}