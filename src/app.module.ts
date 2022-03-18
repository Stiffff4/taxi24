import { Module } from '@nestjs/common';
import { ConductorModule } from './controllers/Conductor/conductor.module';
import { FacturaModule } from './controllers/Factura/factura.module';
import { PasajeroModule } from './controllers/Pasajero/pasajero.module';
import { VehiculoModule } from './controllers/Vehiculo/vehiculo.module';
import { ViajeModule } from './controllers/Viaje/viaje.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { ValidationModule } from './services/Validation/validation.module';

@Module({
  imports: [
    ConductorModule, 
    ViajeModule, 
    PasajeroModule,
    VehiculoModule,
    FacturaModule,
    ValidationModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
