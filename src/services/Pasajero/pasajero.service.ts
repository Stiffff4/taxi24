import { Injectable } from "@nestjs/common";
import { Pasajero } from "@prisma/client";
import { PasajeroData } from "../../database/DataAccess/Pasajero/pasajero.data";
import { ValidationService } from "../Validation/validation.service";

@Injectable()
export class PasajeroService {
    constructor(private data: PasajeroData, private validar: ValidationService){}

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

            const datos = await this.data.obtenerUno(where);

            this.validar.sinDatos(datos);

            return datos;
        }
        catch(error){
            throw error;
        }
    }

    async agregar(pasajero: Pasajero){
        try {
            this.validar.cuerpoVacio(pasajero);
            this.validar.arrayVacioNulo(Object.values(pasajero));
            this.validar.ubicacion(pasajero.Ubicacion);

            return await this.data.agregar(pasajero);
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
            this.validar.arrayVacioNulo(Object.values(body.pasajero));

            return await this.data.actualizar(body.pasajero, body.where);
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