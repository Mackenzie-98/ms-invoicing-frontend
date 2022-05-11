import { Component, Input, OnInit } from '@angular/core';
import { IAlertaService } from '@core/services/alertas/alerta.service';
import { Producto } from '@producto/shared/model/producto';
import { ProductoService } from '@producto/shared/service/producto.service';

const DESEA_ELIMINAR_PRODUCTO = 'Esta seguro de eliminar este producto?';
const PRODUCTO_ELIMINADO_CORRECTAMENTE = 'Se ha eliminado el producto correctamente.';

@Component({
  selector: 'app-borrar-producto',
  templateUrl: './borrar-producto.component.html',
  styleUrls: ['./borrar-producto.component.css']
})
export class BorrarProductoComponent implements OnInit {


  @Input()
  producto: Producto;

  constructor(protected productoService: ProductoService,
    protected alert: IAlertaService) { }

  ngOnInit() {
  }

  borrarProducto(): void {
    this.alert.confirmacion(DESEA_ELIMINAR_PRODUCTO).subscribe(
      confirm => {
        if (confirm.confirmado) {
          this.productoService.eliminar(this.producto).subscribe(
            () => {
                this.alert.exito(PRODUCTO_ELIMINADO_CORRECTAMENTE);
                window.location.reload();
            });
        }
      });
  }

}
