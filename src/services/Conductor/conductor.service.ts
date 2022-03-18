import { Injectable } from "@nestjs/common";
import { Conductor } from "@prisma/client";
import { ConductorData } from "../../database/DataAccess/Conductor/conductor.data"; 
import { ValidationService } from "../Validation/validation.service";

@Injectable()
export class ConductorService {
    constructor(private data: ConductorData, private validar: ValidationService){}

    async obtenerConductoresDisponiblesCercanos(body: any){
        try {
            this.validar.cuerpoVacio(body);
            this.validar.arrayVacioNulo(Object.values(body));
            this.validar.propiedadesIncorrectas(body, ['ubicacion'.toLowerCase()])
            this.validar.ubicacion(body.ubicacion);

            const availableDrivers = await this.data.obtenerConductoresDisponiblesCercanos(body.ubicacion);
            this.validar.sinDatosArray(availableDrivers);

            return availableDrivers;
        } 
        catch (error) {
            throw error;
        }
    }

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

    async agregar(conductor: Conductor){
        try {
            this.validar.cuerpoVacio(conductor);
            this.validar.arrayVacioNulo(Object.values(conductor));
            this.validar.ubicacion(conductor.UbicacionActual);

            return await this.data.agregar(conductor);
        } 
        catch (error) {
            throw error;
        }
    }

    async actualizar(body: any){
        try {
            this.validar.cuerpoVacio(body);
            this.validar.propiedadesIncorrectas(body, ['where', 'conductor'])
            this.validar.arrayVacioNulo(Object.values(body.where));
            this.validar.arrayVacioNulo(Object.values(body.conductor));
            
            return await this.data.actualizar(body.conductor, body.where);
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