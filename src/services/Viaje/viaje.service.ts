import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Conductor, Pasajero, Viaje } from "@prisma/client";
import { PasajeroData } from "../../database/DataAccess/Pasajero/pasajero.data";
import { ViajeData } from "../../database/DataAccess/Viaje/viaje.data";
import { DistanceData } from "../Distance/distance.data";
import { ValidationService } from "../Validation/validation.service";

@Injectable()
export class ViajeService {
    constructor(
        private data: ViajeData, 
        private validar: ValidationService, 
        private dataPasajero: PasajeroData,
        private distancia: DistanceData
    ){}

    async solicitarViaje(body: any){
        try {
            this.validar.arrayVacioNulo(Object.values(body));
            this.validar.propiedadesIncorrectas(body, ['pasajero', 'ubicacionDestino', 'metodoPago']);

            const viaje: Viaje = await this.data.obtenerUno(
                {"IDPasajero": body.pasajero, "Activo": true},
            );
            const pasajero: Pasajero = await this.dataPasajero.obtenerPorId(body.pasajero);

            const conductorCercano: Conductor = (await this.distancia.obtenerConductoresDisponiblesCercanos(pasajero.Ubicacion, 1))[0];

            if (conductorCercano == null){
                throw new HttpException('No hay conductores disponibles.', HttpStatus.BAD_REQUEST);
            }

            if (viaje){
                if (viaje.Activo){
                    throw new HttpException('Este pasajero ya se encuentra en un viaje.', HttpStatus.BAD_REQUEST);
                }
            }

            if (pasajero.Ubicacion == body.ubicacionDestino){
                throw new HttpException('Las ubicaciones no pueden ser las mismas.', HttpStatus.BAD_REQUEST); 
            }

            this.validar.ubicacion(body.ubicacionDestino);

            return this.data.solicitarViaje(body.pasajero, body.ubicacionDestino, body.metodoPago, conductorCercano);
        } 
        catch (error) {
            throw error;
        }
    }

    async completarViaje(body: any){
        try {
            this.validar.cuerpoVacio(body);
            this.validar.propiedadesIncorrectas(body, ['ID', 'Valoracion']);

            if (!body.ID || body.ID < 1){
                throw new HttpException('El ID no puede ser nulo', HttpStatus.BAD_REQUEST);
            }

            const viaje: Viaje = await this.data.obtenerPorId(body.ID);
                        
            if (!viaje){
                throw new HttpException('El viaje no existe', HttpStatus.BAD_REQUEST); 
            }

            if (viaje.Completado){
                throw new HttpException('El viaje ya ha sido completado', HttpStatus.BAD_REQUEST); 
            }

            return this.data.completarViaje(body.ID, body.Valoracion);
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

    async obtenerViajesActivos(){
        try {        
            const data = await this.data.obtenerViajesActivos();

            this.validar.sinDatos(data);

            return data;
        }
        catch(error){
            throw error;
        }
    }

    async agregar(viaje: Viaje){
        try {
            this.validar.cuerpoVacio(viaje);
            this.validar.arrayVacioNulo(Object.values(viaje));

            return await this.data.agregar(viaje);
        } 
        catch (error) {
            throw error;
        }
    }

    async actualizar(body: any){
        try {
            this.validar.cuerpoVacio(body);
            this.validar.propiedadesIncorrectas(body, ['where', 'viaje'])
            this.validar.arrayVacioNulo(Object.values(body.where));
            this.validar.arrayVacioNulo(Object.values(body.viaje));

            return await this.data.actualizar(body.viaje, body.viaje);
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