import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from '@factura/shared/model/factura';
import { FacturaService } from '@factura/shared/service/factura.service';
import { IAlertaService } from '@core/services/alertas/alerta.service';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  factura: Factura;

  
  constructor(protected facturaService: FacturaService, private router: Router, protected alerta: IAlertaService) { 
    this.factura = this.router.getCurrentNavigation().extras.state.facturaInput;
  }

  ngOnInit() {
    console.log(this.factura);
  }

  subTotal(cantidad:number,precio:number):number{
    return cantidad*precio;
  }
}
