import { Injectable } from "@nestjs/common";
import { Vehiculo } from "@prisma/client"; 
import { VehiculoData } from "../../database/DataAccess/Vehiculo/vehiculo.data";
import { ValidationService } from "../Validation/validation.service";

@Injectable()
export class VehiculoService{
    constructor(private data: VehiculoData, private validar: ValidationService){}

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

    async actualizar(body: any){
        try {
            this.validar.cuerpoVacio(body);
            this.validar.propiedadesIncorrectas(body, ['where', 'vehiculo'])
            this.validar.arrayVacioNulo(Object.values(body.where));
            this.validar.arrayVacioNulo(Object.values(body.vehiculo));

            return await this.data.actualizar(body.where, body.vehiculo);
        } 
        catch (error) {
            throw error;
        }
    }

    async eliminar(where: Object){
        try {
            this.validar.cuerpoVacio(where);
            this.validar.arrayVacioNulo(Object.values(where));

            return await this.data.eliminar(where);
        } 
        catch (error) {
            throw error;
        }
    }
}