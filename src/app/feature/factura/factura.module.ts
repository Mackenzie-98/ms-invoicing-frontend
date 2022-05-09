import { NgModule } from '@angular/core';

import { FacturaRoutingModule } from './factura-routing.module';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { SharedModule } from '@shared/shared.module';
import { FacturaService } from './shared/service/factura.service';
import { AlertaService, IAlertaService } from '@core/services/alertas/alerta.service';
import { FacturaComponent } from './components/factura/factura.component';
import { ProductoService } from '@producto/shared/service/producto.service';
import { ListarFacturasUsuarioComponent } from './components/listar-facturas-usuario/listar-facturas-usuario.component';
import { DetalleFacturaComponent } from './components/detalle-factura/detalle-factura.component';

@NgModule({
  declarations: [
    CrearFacturaComponent,
    ListarFacturasUsuarioComponent,
    DetalleFacturaComponent,
    FacturaComponent
  ],
  imports: [
    FacturaRoutingModule,
    SharedModule
  ],
  providers: [FacturaService, ProductoService, {provide: IAlertaService, useClass: AlertaService}]
})
export class FacturaModule { }
