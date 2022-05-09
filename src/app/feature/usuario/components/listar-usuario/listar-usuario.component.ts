import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { Usuario } from '@usuario/shared/model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  public listaUsuarios: Observable<Usuario[]>;

  constructor(protected usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.listaUsuarios = this.usuarioService.consultar();
  }

  hashPassword(password: string){
    return "*".repeat(password.length)
  }

  vender(usuario: Usuario){
    this.router.navigate(['factura/crear-factura'], {
      state: {usuarioInput: usuario}
    });
  }

  verFacturas(idUsuario: number){
    this.router.navigate(['factura/listar-facturas-usuario'], {
      state: {idUsuarioInput: idUsuario}
    });
  }
  
}
