import { Body, Controller, Get, Post, Put, Delete, Param } from "@nestjs/common";
import { ViajeService } from "../../services/Viaje/viaje.service";

@Controller('api/viaje')
export class ViajeController {
    constructor(private service: ViajeService){}
    
    @Post('SolicitarViaje')
    async SolicitarViaje(@Body() body){
        return await this.service.solicitarViaje(body);
    }

    @Post('CompletarViaje')
    async CompletarViaje(@Body() body){
        return await this.service.completarViaje(body);
    }

    @Get('ObtenerMuchos')
    async ObtenerMuchos(@Body() body){
        return await this.service.ObtenerMuchos(body);
    }

    @Get('ObtenerUno')
    async ObtenerUno(@Body() body){
        return await this.service.ObtenerUno(body);
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