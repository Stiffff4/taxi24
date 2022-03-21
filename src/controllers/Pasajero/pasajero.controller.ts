import { Body, Controller, Get, Post, Put, Delete, ParseIntPipe, Param } from "@nestjs/common";
import { PasajeroService } from "../../services/Pasajero/pasajero.service";

@Controller('api/pasajeros')
export class PasajeroController {
    constructor(private service: PasajeroService){}

    @Get('conductores-cercanos')
    async GetAvailableDrivers(@Body() body){
        return await this.service.obtenerConductoresDisponiblesCercanos(body);
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