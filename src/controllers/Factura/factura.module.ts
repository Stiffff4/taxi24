import { Module } from "@nestjs/common";
import { FacturaData } from "../../database/DataAccess/Factura/factura.data";
import { PrismaModule } from "../../database/prisma/prisma.module";
import { FacturaService } from "../../services/Factura/factura.service"; 
import { ValidationModule } from "../../services/Validation/validation.module";
import { FacturaController } from "./factura.controller";

@Module({
    imports: [PrismaModule, ValidationModule],
    controllers: [FacturaController],
    providers: [FacturaService, FacturaData],
})
export class FacturaModule{}