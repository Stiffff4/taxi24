import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { FacturaService } from "../../services/Factura/factura.service"; 

@Controller('api/facturas')
export class FacturaController  {
    constructor(private service: FacturaService){}

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