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
            
            const datos = await this.data.obtenerPorId(id);

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