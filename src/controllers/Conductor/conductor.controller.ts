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
        console.log('aqui')
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