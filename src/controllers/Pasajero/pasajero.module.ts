import { Module } from "@nestjs/common";
import { PasajeroData } from "../../database/DataAccess/Pasajero/pasajero.data"; 
import { PrismaModule } from "../../database/prisma/prisma.module";
import { DistanceService } from "../../services/Distance/distance.service";
import { PasajeroService } from "../../services/Pasajero/pasajero.service";
import { ValidationService } from "../../services/Validation/validation.service";
import { PasajeroController } from "./pasajero.controller";

@Module({
    imports: [PrismaModule],
    controllers: [PasajeroController],
    providers: [PasajeroService, PasajeroData, ValidationService, DistanceService],
})
export class PasajeroModule{}