import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { DetalleFacturaComponent } from './components/detalle-factura/detalle-factura.component';
import { FacturaComponent } from './components/factura/factura.component';
import { ListarFacturasUsuarioComponent } from './components/listar-facturas-usuario/listar-facturas-usuario.component';


const routes: Routes = [
  {
    path: '',
    component: FacturaComponent,
    children: [
      {
        path: 'crear-factura',
        component: CrearFacturaComponent
      },
      {
        path: 'listar-facturas-usuario',
        component: ListarFacturasUsuarioComponent
      },
      {
        path: 'detalle-factura',
        component: DetalleFacturaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
