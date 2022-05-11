import { Component, Input, OnInit } from '@angular/core';
import { IAlertaService } from '@core/services/alertas/alerta.service';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';

const mensajeEliminarUsuario = 'Esta seguro de eliminar este usuario?';
const mensajeEliminacionUsuario = 'Se ha eliminado el usuario correctamente.';

@Component({
  selector: 'app-borrar-usuario',
  templateUrl: './borrar-usuario.component.html',
  styleUrls: ['./borrar-usuario.component.css']
})

export class BorrarUsuarioComponent implements OnInit {

  @Input()
  usuario: Usuario;

  constructor(protected usuarioService: UsuarioService,
    protected alert: IAlertaService) { }

  ngOnInit() {
  }

  borrarUsuario(): void {
    this.alert.confirmacion(mensajeEliminarUsuario).subscribe(
      confirm => {
        if (confirm.confirmado) {
          this.usuarioService.eliminar(this.usuario).subscribe(
            ()=> {
                this.alert.exito(mensajeEliminacionUsuario);
                window.location.reload();
            });
        }
      });
  }

}
