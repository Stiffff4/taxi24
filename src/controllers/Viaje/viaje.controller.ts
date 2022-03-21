import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { ViajeService } from "../../services/Viaje/viaje.service";

@Controller('api/viajes')
export class ViajeController {
    constructor(private service: ViajeService){}
    
    @Post('solicitar')
    async SolicitarViaje(@Body() body){
        return await this.service.solicitarViaje(body);
    }

    @Post('completar')
    async CompletarViaje(@Body() body){
        return await this.service.completarViaje(body);
    }

    @Get('activos')
    async ObtenerViajesActivos(){
        return await this.service.obtenerViajesActivos();
    }

    @Get()
    async ObtenerTodos(){
        return await this.service.obtenerTodos();
    }

    @Get('/:id')
    async ObtenerPorId(@Param('id', ParseIntPipe) id: number){
        return await this.service.obtenerPorId(id);
    }

    @Post('agregar')
    async Agregar(@Body() body){
        return await this.service.agregar(body);
    }

    @Put('actualizar')
    async Actualizar(@Body() body){
        return await this.service.actualizar(body);
    }

    @Delete('eliminar')
    async Eliminar(@Body() body){
        return await this.service.eliminar(body);
    }
}