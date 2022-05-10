import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from '@factura/shared/model/factura';
import { FacturaService } from '@factura/shared/service/factura.service';
import { IAlertaService } from '@core/services/alertas/alerta.service';

const FACTURA_ELIMINADA_CORECTAMENTE = "Factura eliminada correctamente.";
@Component({
  selector: 'app-listar-facturas-usuario',
  templateUrl: './listar-facturas-usuario.component.html',
  styleUrls: ['./listar-facturas-usuario.component.css']
})
export class ListarFacturasUsuarioComponent implements OnInit {

  listaFacturas: Factura[];
  idUsuario: number;

  constructor(protected facturaService: FacturaService, private router: Router, protected alerta: IAlertaService) { 
    this.idUsuario = this.router.getCurrentNavigation().extras.state.idUsuarioInput;
  }

  ngOnInit() {
      this.facturaService.consultarPorUsuario(this.idUsuario).subscribe(data =>{
      this.listaFacturas = data;
    });
  }


  eliminarFactura(index:number, factura:Factura){
    this.facturaService.eliminar(factura).subscribe(() => {
        this.alerta.exito(FACTURA_ELIMINADA_CORECTAMENTE)
    });
    this.listaFacturas.splice(index,1);
  }

  detalleFactura(factura: Factura){
    this.router.navigate(['factura/detalle-factura'], {
      state: {facturaInput: factura}
    });
  }
  
}
