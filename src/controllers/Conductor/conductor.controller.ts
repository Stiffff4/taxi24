import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { ConductorService } from "../../services/Conductor/conductor.service";

@Controller('api/conductores')
export class ConductorController  {
    constructor(private service: ConductorService){}

    @Get('disponibles-cercanos')
    async ObtenerConductoresCercanos(@Body() body){
        return await this.service.obtenerConductoresDisponiblesCercanos(body);
    }

    @Get('disponibles')
    async ObtenerConductoresDisponibles(){
        return await this.service.obtenerConductoresDisponibles();
    }

    @Get()
    async ObtenerTodos(){
        return await this.service.obtenerTodos();
    }

    @Get(':id')
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