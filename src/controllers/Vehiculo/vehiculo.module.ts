import { Module } from "@nestjs/common";
import { VehiculoData } from "../../database/DataAccess/Vehiculo/vehiculo.data";
import { PrismaModule } from "../../database/prisma/prisma.module";
import { VehiculoService } from "../../services/Vehiculo/vehiculo.service"; 
import { ValidationModule } from "../../services/Validation/validation.module";
import { VehiculoController } from "./vehiculo.controller";

@Module({
    imports: [PrismaModule, ValidationModule],
    controllers: [VehiculoController],
    providers: [VehiculoService, VehiculoData],
})
export class VehiculoModule{}