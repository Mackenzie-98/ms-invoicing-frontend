import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../shared/service/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAlertaService } from '@core/services/alertas/alerta.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 4;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;
const mensajeCreoUsuario = 'Se ha creado el usuario correctamente.';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  constructor(protected usuarioServices: UsuarioService, private alerta: IAlertaService) { }

  ngOnInit() {
    this.construirFormularioUsuario();
  }

  crear() {
    this.usuarioServices.guardar(this.usuarioForm.value).subscribe(
      () => {
        this.alerta.exito(mensajeCreoUsuario);
        this.usuarioForm.reset();
      }
    );

  }

  private construirFormularioUsuario() {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      clave: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                             Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)])
    });
  }

}
