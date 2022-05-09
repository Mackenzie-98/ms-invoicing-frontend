export class Producto {
    id: number;
    nombre: string;
    precioUnitario: number;

    constructor(id: number, nombre: string, precioUnitario: number) {
        this.id = id;
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
    }
}
