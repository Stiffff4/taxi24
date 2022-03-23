import { Module } from "@nestjs/common";
import { PrismaModule } from "../../database/prisma/prisma.module"; 
import { ViajeData } from "../../database/DataAccess/Viaje/viaje.data";
import { ViajeService } from "../../services/Viaje/viaje.service"; 
import { ValidationService } from "../../services/Validation/validation.service";
import { ViajeController } from "./viaje.controller";
import { DistanceData } from "../../database/DataAccess/Distance/distance.data";
import { FacturaData } from "../../database/DataAccess/Factura/factura.data";
import { PasajeroData } from "../../database/DataAccess/Pasajero/pasajero.data";

@Module({
    imports: [PrismaModule],
    controllers: [ViajeController],
    providers: [ViajeService, ViajeData, ValidationService, DistanceData, FacturaData, PasajeroData],
})
export class ViajeModule{}