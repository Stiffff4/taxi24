import { Body, Controller, Get, Post, Put, Delete } from "@nestjs/common";
import { PasajeroService } from "../../services/Pasajero/pasajero.service";

@Controller('api/pasajero')
export class PasajeroController {
    constructor(private service: PasajeroService){}

    @Get('ObtenerConductoresCercanos')
    async GetAvailableDrivers(@Body() body){
        return await this.service.obtenerConductoresDisponiblesCercanos(body);
    }

    @Get('ObtenerMuchos')
    async ObtenerMuchos(@Body() body){
        return await this.service.obtenerMuchos(body);
    }

    @Get('ObtenerUno')
    async ObtenerUno(@Body() body){
        return await this.service.obtenerUno(body);
    }

    @Post('Agregar')
    async Agregar(@Body() body){
        return await this.service.agregar(body);
    }

    @Put('Actualizar')
    async Actualizar(@Body() body){
        return await this.service.actualizar(body);
    }

    @Delete('Eliminar')
    async Eliminar(@Body() body){
        return await this.service.eliminar(body);
    }
}