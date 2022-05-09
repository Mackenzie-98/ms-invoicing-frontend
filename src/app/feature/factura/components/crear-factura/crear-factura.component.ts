import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAlertaService } from '@core/services/alertas/alerta.service';
import { Factura } from '@factura/shared/model/factura';
import { ProductoVenta } from '@factura/shared/model/ProductoVenta';
import { Producto } from '@producto/shared/model/producto';
import { ProductoService } from '@producto/shared/service/producto.service';
import { Usuario } from '@usuario/shared/model/usuario';
import { FacturaService } from '../../shared/service/factura.service';

const FACTURA_CREADA_CORRECTAMENTE = 'Se ha creado la factura correctamente.';
const PRODUCTO_YA_FUE_CARGADO = 'El producto ya fue cargado en la lista de compra.';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {
  
  usuario: Usuario;
  listaProductos: Producto[];
  factura: Factura;
  carritoCompras: Array<ProductoVenta> = [];
  total: number = 0;
  descripcion: string;

  constructor(protected productoService: ProductoService,protected facturaServices: FacturaService, 
    protected alerta: IAlertaService, private router: Router) { 
    this.usuario = this.router.getCurrentNavigation().extras.state.usuarioInput;
  }

  ngOnInit() {
    this.productoService.consultar().subscribe(data =>{
      if(data){this.listaProductos = data;}
    });
  }

  deleteFieldValue(index) {
      this.carritoCompras.splice(index, 1);
      this.calcularTotal();
  }

  onChange(index) {
    if(!this.verificarDuplicidad(this.listaProductos[index], this.carritoCompras)){
      this.carritoCompras.push(new ProductoVenta(null,this.listaProductos[index], 1));
      this.calcularTotal();
    }else
      this.alerta.errorInesperado(PRODUCTO_YA_FUE_CARGADO);
  }

  verificarDuplicidad(producto:Producto, carritoCompras: Array<ProductoVenta>): boolean{
    for (let index = 0; index < carritoCompras.length; index++) {
      if(producto.id == carritoCompras[index].producto.id){
        return true;
      }
    }
    return false;
  }

  setCantidad(index:number,cantidad:number){
    this.carritoCompras[index].cantidad = cantidad;
    this.calcularTotal();
  }

  setDescripcion(text:string){
    this.descripcion = text;
  }

  facturar(){
    this.factura = new Factura(null,this.descripcion,this.usuario,this.carritoCompras, null,this.total);
    this.facturaServices.guardar(this.factura).subscribe(
      data => {
        if (data){
        this.alerta.exito(FACTURA_CREADA_CORRECTAMENTE);
        this.carritoCompras = [];
        this.router.navigateByUrl('/usuario/listar');
      }}
    );
    
  }

  calcularTotal(){
    this.total = 0;
    for (let index = 0; index < this.carritoCompras.length; index++) {
      this.total+= this.carritoCompras[index].cantidad * this.carritoCompras[index].producto.precioUnitario;
    }
  }
}
