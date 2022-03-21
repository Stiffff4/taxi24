import { Body, Controller, Get, Post, Put, Delete, ParseIntPipe, Param } from "@nestjs/common";
import { VehiculoService } from "../../services/Vehiculo/vehiculo.service";

@Controller('api/vehiculos')
export class VehiculoController  {
    constructor(private service: VehiculoService){}

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