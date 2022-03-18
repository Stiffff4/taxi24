import { Body, Controller, Get, Post, Put, Delete } from "@nestjs/common";
import { ConductorService } from "../../services/Conductor/conductor.service";

@Controller('api/conductor')
export class ConductorController  {
    constructor(private service: ConductorService){}

    @Get('ObtenerConductoresCercanos')
    async ObtenerConductoresCercanos(@Body() body){
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