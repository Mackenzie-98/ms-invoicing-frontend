import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';
import { BorrarUsuarioComponent } from './components/borrar-usuario/borrar-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';


const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      {
        path: 'crear',
        component: CrearUsuarioComponent
      },
      {
        path: 'listar',
        component: ListarUsuarioComponent
      },
      {
        path: 'borrar',
        component: BorrarUsuarioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
