import { Component, Injectable, OnInit } from '@angular/core';
import { ProductoService } from '../../shared/service/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAlertaService } from '@core/services/alertas/alerta.service';

const PRODUCTO_CREADO_CORRECTAMENTE = 'Se ha creado el producto correctamente.';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})

@Injectable()
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  constructor(protected productoServices: ProductoService, private alerta: IAlertaService) { }

  ngOnInit() {
    this.construirFormularioProducto();
  }

  crear() {
    this.productoServices.guardar(this.productoForm.value).subscribe(
      () => {
        this.alerta.exito(PRODUCTO_CREADO_CORRECTAMENTE);
        this.productoForm.reset();
      }
    );
  }

  private construirFormularioProducto() {
    this.productoForm = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),
      precioUnitario: new FormControl('', [Validators.required])                                                 
    });
  }

}
