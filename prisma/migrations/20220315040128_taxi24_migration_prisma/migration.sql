-- DROP TABLE Conductor;
-- DROP TABLE Pasajero;
-- DROP TABLE Viaje;
-- DROP TABLE Factura;

-- CreateTable
CREATE TABLE "Conductor" (
    "ID" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Apellido" TEXT NOT NULL,
    "Edad" INTEGER NOT NULL,
    "ViajesCompletados" INTEGER NOT NULL,
    "Ubicacion" TEXT NOT NULL,
    "Disponible" BOOLEAN NOT NULL,
    "IDVehiculo" INTEGER NOT NULL,

    CONSTRAINT "Conductor_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Pasajero" (
    "ID" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Apellido" TEXT NOT NULL,
    "Edad" INTEGER NOT NULL,
    "ViajesCompletados" INTEGER NOT NULL,
    "Ubicacion" TEXT NOT NULL,

    CONSTRAINT "Pasajero_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Viaje" (
    "ID" SERIAL NOT NULL,
    "UbicacionDestino" TEXT NOT NULL,
    "FechaInicio" TIMESTAMP(3) NOT NULL,
    "FechaFin" TIMESTAMP(3) NOT NULL,
    "Duracion" INTEGER NOT NULL,
    "DistanciaRecorridaKM" INTEGER NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "Completado" BOOLEAN NOT NULL,
    "MetodoPago" TEXT NOT NULL,
    "Valoracion" INTEGER,
    "IDConductor" INTEGER NOT NULL,
    "IDPasajero" INTEGER NOT NULL,

    CONSTRAINT "Viaje_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Vehiculo" (
    "ID" SERIAL NOT NULL,
    "Marca" TEXT NOT NULL,
    "Modelo" TEXT NOT NULL,
    "Ano" INTEGER NOT NULL,
    "Color" TEXT NOT NULL,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Factura" (
    "ID" SERIAL NOT NULL,
    "Precio" INTEGER NOT NULL,
    "IDViaje" INTEGER NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Viaje_IDConductor_key" ON "Viaje"("IDConductor");

-- CreateIndex
CREATE UNIQUE INDEX "Viaje_IDPasajero_key" ON "Viaje"("IDPasajero");

-- CreateIndex
CREATE UNIQUE INDEX "Factura_IDViaje_key" ON "Factura"("IDViaje");

-- AddForeignKey
ALTER TABLE "Conductor" ADD CONSTRAINT "Conductor_IDVehiculo_fkey" FOREIGN KEY ("IDVehiculo") REFERENCES "Vehiculo"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viaje" ADD CONSTRAINT "Viaje_IDConductor_fkey" FOREIGN KEY ("IDConductor") REFERENCES "Conductor"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viaje" ADD CONSTRAINT "Viaje_IDPasajero_fkey" FOREIGN KEY ("IDPasajero") REFERENCES "Pasajero"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_IDViaje_fkey" FOREIGN KEY ("IDViaje") REFERENCES "Viaje"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
