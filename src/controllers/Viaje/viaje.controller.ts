import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { ViajeService } from "../../services/Viaje/viaje.service";

@Controller('api/viajes')
export class ViajeController {
    constructor(private service: ViajeService){}
    
    @Post('solicitar')
    async SolicitarViaje(@Body() body){
        return await this.service.solicitarViaje(body);
    }

    @Post('completar/:id')
    async CompletarViaje(@Param('id', ParseIntPipe) id: number, @Body() body){
        return await this.service.completarViaje(id, body);
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

    @Post()
    async Agregar(@Body() body){
        return await this.service.agregar(body);
    }

    @Put(':id')
    async Actualizar(@Body() body, @Param('id', ParseIntPipe) id: number){
        return await this.service.actualizar(body, id);
    }

    @Delete(':id')
    async Eliminar(@Param('id', ParseIntPipe) id: number){
        return await this.service.eliminar(id);
    }
}