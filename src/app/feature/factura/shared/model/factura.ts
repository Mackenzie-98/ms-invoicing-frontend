import { Usuario } from "@usuario/shared/model/usuario";
import { ProductoVenta } from "./ProductoVenta";

export class Factura {
    id: number;
    descripcion: string
    usuario: Usuario;
    productosVenta: Array<ProductoVenta> ;
    fecha:Date;
    total: number;

    constructor(id: number, descripcion: string, usuario: Usuario, productosVenta: Array<ProductoVenta>, fecha:Date, total: number) {
        this.id = id;
        this.descripcion = descripcion;
        this.usuario = usuario;
        this.productosVenta = productosVenta;
        this.fecha = fecha;
        this.total = total;
    }
}
