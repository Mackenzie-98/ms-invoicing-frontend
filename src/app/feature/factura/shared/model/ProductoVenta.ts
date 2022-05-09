import { Producto } from "@producto/shared/model/producto";

export class ProductoVenta {
    id: number;
    producto: Producto
    cantidad: number;
    constructor(id: number, producto: Producto, cantidad: number) {
        this.id = id;
        this.producto = producto;
        this.cantidad = cantidad;
    }
}
