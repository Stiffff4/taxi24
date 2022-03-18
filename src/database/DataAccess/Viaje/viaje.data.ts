import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Viaje, Pasajero, Conductor } from "@prisma/client";
import { PrismaData } from "../../prisma/prisma.data"; 
import { ValidationService } from "../../../services/Validation/validation.service";
import { DistanceService } from "../../../services/Distance/distance.service";
import { FacturaData } from "../Factura/factura.data";

@Injectable()
export class ViajeData {
    constructor(
        private prisma: PrismaData, 
        private validar: ValidationService,
        private distancia: DistanceService,
        private factura: FacturaData
    ){}

    async solicitarViaje(pasajeroId: number, ubicacionDestino: string, metodoPago: string){
        try{
            const pasajero = await this.prisma.pasajero.findUnique({where: {ID: pasajeroId}});
            const conductorCercano: Conductor = (await this.distancia.obtenerConductoresDisponiblesCercanos(pasajero.Ubicacion, 1))[0];

            if (conductorCercano == null){
                throw new HttpException('No hay conductores disponibles.', HttpStatus.BAD_REQUEST);
            }

            const viaje = this.obtenerDatosViaje(pasajero, conductorCercano, ubicacionDestino, metodoPago);
            
            return;
            await this.prisma.viaje.create({data: viaje});

            this.actualizarDisponibilidadConductor(conductorCercano, false);

            return await this.generarDetallesViaje(pasajero, conductorCercano, viaje);
        }
        catch (error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    async completarViaje(id: number, valoracion: number){
        try {
            const viaje = await this.prisma.viaje.findUnique({where: {ID: id}});


            const pasajero = await this.prisma.pasajero.findUnique({where: {ID: viaje.IDPasajero}});
            const conductor = await this.prisma.conductor.findUnique({where: {ID: viaje.IDConductor}});

            const latitudOrigen = parseFloat(pasajero.Ubicacion.split(',')[0]);
            const longitudOrigen = parseFloat(pasajero.Ubicacion.split(',')[1]);
            const latitudDestino = parseFloat(viaje.UbicacionDestino.split(',')[0]);
            const longitudDestino = parseFloat(viaje.UbicacionDestino.split(',')[1]);

            const distancia = this.distancia.calcularDistanciaKM(latitudOrigen, longitudOrigen, latitudDestino, longitudDestino);

            const viajeCompletado = await this.actualizarViajeCompletado(viaje, distancia, valoracion);

            await this.actualizarDisponibilidadConductor(conductor, true);

            await this.actualizarInfoPasajero(pasajero, viajeCompletado.UbicacionDestino);
            await this.actualizarInfoConductor(conductor, viajeCompletado.UbicacionDestino);

            return await this.factura.generarFactura(pasajero, conductor, viajeCompletado);
        } 
        catch (error) {
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async ObtenerMuchos(where?: Object){
        try{
            return await this.prisma.viaje.findMany({where: where});
        }
        catch(error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async ObtenerUno(where: Object){
        try{
            return await this.prisma.viaje.findFirst({where: where});
        }
        catch (error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async agregar(viaje: Viaje){
        try {
            return await this.prisma.viaje.create({data: viaje});
        } 
        catch (error) {
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async actualizar(viaje: Viaje, where: Object){
        try {
            return await this.prisma.viaje.update({
                where: where,
                data: viaje
            });
            
        } 
        catch (error) {
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminar(where: Object){
        try{
            return await this.prisma.viaje.delete({
                where: where
            });
        }
        catch(error){
            this.validar.manejarError(error.toString());
            throw new HttpException(`Error no manejado: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //#region metodosPrivados

    private obtenerDatosViaje(pasajero: Pasajero, conductor: Conductor, location: string, metodoPago: string){
        const viaje = {
            UbicacionDestino: location,
            FechaInicio: new Date().toISOString(),
            FechaFin: new Date('0001-01-01'),
            Duracion: 0,
            DistanciaRecorridaKM: 0,
            Activo: true,
            Completado: false,
            MetodoPago: metodoPago,
            Valoracion: null,
            IDConductor: conductor.ID,
            IDPasajero: pasajero.ID
        }

        return viaje;
    }

    private async actualizarDisponibilidadConductor(conductor: Conductor, disponibilidad: boolean){
        await this.prisma.conductor.update({
            where: {ID: conductor.ID},
            data: {'Disponible': disponibilidad}
        });
    }

    private async actualizarViajeCompletado(viaje: Viaje, distancia: number, valoracion: number){
        
        const fechaFin = new Date();
        const duracion = this.obtenerDuracionViaje(viaje.FechaInicio, fechaFin)

        const viajeUpdate = this.construirObjetoViaje(
            false, 
            true, 
            fechaFin, 
            duracion,
            distancia,
            valoracion
        );

        return await this.prisma.viaje.update({
            where: {ID: viaje.ID},
            data: viajeUpdate
        });

    }

    private async actualizarInfoPasajero(pasajero: Pasajero, ubicacion: string){
        return await this.prisma.pasajero.update({
            where: {ID: pasajero.ID}, 
            data: {Ubicacion: ubicacion, ViajesCompletados: (pasajero.ViajesCompletados+1)}
        });
    }

    private async actualizarInfoConductor(conductor: Conductor, ubicacion: string){
        return await this.prisma.conductor.update({
            where: {ID: conductor.ID}, 
            data: {UbicacionActual: ubicacion, ViajesCompletados: (conductor.ViajesCompletados+1)}
        });
    }
    
    private construirObjetoViaje(activo, completado, fecha, duracion, distancia, valoracion){
        return {
            "Activo": activo,
            "Completado": completado,
            "FechaFin": fecha,
            "Duracion": duracion,
            "DistanciaRecorridaKM": distancia,
            "Valoracion": valoracion
        }
    }

    private async generarDetallesViaje(pasajero: Pasajero, conductor: Conductor, viaje){
        const vehiculo = await this.prisma.vehiculo.findFirst({where: {ID: conductor.IDVehiculo}});

        return {
            "Viaje": {
                "UbicacionOrigen": pasajero.Ubicacion,
                "UbicacionDestino": viaje.UbicacionDestino,
                "Conductor": {
                    "Nombre": conductor.Nombre,
                    "Apellido": conductor.Apellido,
                    "Vehiculo": {
                        "Marca": vehiculo.Marca,
                        "Modelo": vehiculo.Modelo,
                        "Color": vehiculo.Color
                    }
                },
            }
        }
    }

    private obtenerDuracionViaje(fechaInicio: Date, fechaFin: Date): number{

        let horas = fechaFin.getTime() - fechaInicio.getTime(); 

        return Math.abs(Math.round(horas / 60 / 1000)); 
    }

    //#endregion metodosPrivados
}