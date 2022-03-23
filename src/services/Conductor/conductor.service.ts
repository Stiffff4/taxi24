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

    async obtenerConductoresDisponibles(){
        try {
            const data = await this.data.obtenerConductoresDisponibles();

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
            this.validar.ubicacion(conductor.Ubicacion);

            return await this.data.agregar(conductor);
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