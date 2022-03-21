import { Module } from "@nestjs/common";
import { ConductorData } from "../../database/DataAccess/Conductor/conductor.data";
import { PrismaModule } from "../../database/prisma/prisma.module";
import { ConductorService } from "../../services/Conductor/conductor.service";
import { DistanceData } from "../../services/Distance/distance.data";
import { ValidationModule } from "../../services/Validation/validation.module";
import { ConductorController } from "./conductor.controller";

@Module({
    imports: [PrismaModule, ValidationModule],
    controllers: [ConductorController],
    providers: [ConductorService, ConductorData, DistanceData],
})
export class ConductorModule{}