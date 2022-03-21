import { Injectable } from "@nestjs/common";
import { Conductor } from "@prisma/client";
import { PrismaData } from "../../database/prisma/prisma.data";

@Injectable()
export class DistanceData{

    constructor(private prisma: PrismaData){}
    
    async obtenerConductoresDisponiblesCercanos(location: string, contador?: number){
        const radio = 3;
        let conductoresDisponiblesCercanos: Conductor[] = [];         

        const latitudP = parseFloat(location.split(',')[0]);
        const longitudP = parseFloat(location.split(',')[1]);
        
        const ubicacionesConductores = (await this.prisma.conductor.findMany())
                                            .filter(x => x.Disponible == true)
                                            .map(x => x.UbicacionActual);

        for(let i=0; i<ubicacionesConductores.length; i++){
            const latitudC = parseFloat(ubicacionesConductores[i].split(',')[0]);
            const longitudC = parseFloat(ubicacionesConductores[i].split(',')[1]); 
            const distancia = this.calcularDistanciaKM(latitudP, longitudP, latitudC, longitudC);

            const conductor = await this.prisma.conductor.findFirst({
                    where: {
                        UbicacionActual: ubicacionesConductores[i],
                    }
                }
            )

            if (distancia <= radio){
                if (conductor)
                    conductoresDisponiblesCercanos.push(conductor);
            }

            if (conductoresDisponiblesCercanos.length >= contador) break;
        }

        return conductoresDisponiblesCercanos;
    }
    
    calcularDistanciaKM(lat1: number, lng1: number, lat2: number, lng2: number) {
        const radioTierra: number = 6371; // en KM
    
        const distanciaLatitud: number = this.convertirRadianes(lat2-lat1);
        const distanciaLongitud: number = this.convertirRadianes(lng2-lng1);
    
        const senoDistanciaLatitud: number = Math.sin(distanciaLatitud / 2);
        const senoDistanciaLongitud: number = Math.sin(distanciaLongitud / 2);
    
        const a: number = Math.pow(senoDistanciaLatitud, 2) + Math.pow(senoDistanciaLongitud, 2)
            * Math.cos(this.convertirRadianes(lat1)) * Math.cos(this.convertirRadianes(lat2));
    
        const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
        const distancia: number = radioTierra * c; //distancia en kilómetros
    
        return distancia;
    }

    convertirRadianes(number: number){
        return (number * Math.PI) / 180.0;
    }
}