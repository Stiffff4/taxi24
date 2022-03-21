import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class ValidationService {
    
    manejarError(error: String){
        if (error.includes('Unknown arg')){
            throw new HttpException(`Una de las propiedades no existe.`, HttpStatus.BAD_REQUEST);
        }

        if (error.includes('needs at least')){
            throw new HttpException(`Dé al menos 1 argumento para el filtro.`, HttpStatus.BAD_REQUEST);
        }

        if (error.includes('Lines with + are required')){
            throw new HttpException(`Faltan campos.`, HttpStatus.BAD_REQUEST);
        }

        if (error.includes('Got invalid value')){
            throw new HttpException(`Uno de los valores no es válido.`, HttpStatus.BAD_REQUEST);
        }

        if (error.includes('Argument') && error.includes('is missing')){
            throw new HttpException(`Objeto invalido.`, HttpStatus.BAD_REQUEST);
        }

        if (error.includes('Foreign key')){
            throw new HttpException(`ID llave foránea inválida.`, HttpStatus.BAD_REQUEST);
        }

        if (error.includes('No hay conductores')){
            throw new HttpException('No hay conductores disponibles.',  HttpStatus.NOT_FOUND);
        }

        return;
    }

    ubicacion(ubicacion: string){
        const error = new HttpException('Ubicacion invalida', HttpStatus.BAD_REQUEST);

        try {
            const ubicacionArr: string[] = ubicacion.split(',');

            const latitud = parseFloat(ubicacionArr[0]);
            const longitud = parseFloat(ubicacionArr[1]);
            
            if (!latitud || !longitud){
                throw error;
            }

        } 
        catch (error) {
            throw error
        }
    }

    idInvalido = (id: number) => {
        if (id < 1 || !id){
            throw new HttpException('El ID no es válido.', HttpStatus.BAD_REQUEST);
        }
    }

    arrayVacioNulo = (values: any[]) => {
        values.forEach(element => {
            if (element == "" || element == null || element == undefined || element == " ")
                throw new HttpException('No puede haber campos vacios.', HttpStatus.BAD_REQUEST);
        });
    }

    objetoVacioNulo = (object: any) => {
        if (object == "" || object == null || object == undefined || object == " ")
            throw new HttpException('No puede haber campos vacios.', HttpStatus.BAD_REQUEST);
    }

    sinDatosArray = (data: any[]) => {
        if (data.length == 0){
            throw new HttpException(`No hay datos.`, HttpStatus.NOT_FOUND);
        }
    }

    sinDatos = (data: any) => {
        if (data == null){
            throw new HttpException(`No hay datos.`, HttpStatus.NOT_FOUND);
        }
    }

    cuerpoVacio = (obj: Object) => {
        if (Object.keys(obj).length === 0) {
            throw new HttpException('Debe enviar datos en el cuerpo.', HttpStatus.BAD_REQUEST);
        }
    }

    propiedadesIncorrectas = (bodyObject, properties: string[]) => {
        const arr: string[] = Object.keys(bodyObject);

        if (JSON.stringify(arr) != JSON.stringify(properties)){
            throw new HttpException('Propiedades incorrectas', HttpStatus.BAD_REQUEST);
        }
    }
}