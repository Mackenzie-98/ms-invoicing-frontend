import { Component, OnInit } from '@angular/core';
import { TrmService } from '../service/trm.service';
import { DatePipe } from '@angular/common';
import { Trm } from '../modelo/trm';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trm',
  templateUrl: './trm.component.html'
})
export class TrmComponent implements OnInit {

  public trm;
  spinner = true;

  constructor(protected trmService: TrmService, private datePipe: DatePipe) { }

  public trmActual: Observable<Trm[]>;

  ngOnInit(): void {
    const milisegundoSpinner = 500;

    setTimeout(() => {
      this.spinner = false;
    }, milisegundoSpinner);

    this.obtenerTrmActualColombia();
  }

  obtenerTrmActualColombia() {
    const DIAS_MAXIMOS_VIGENCIA_TRM = 4;
    const fecha = new Date(new Date().setDate(new Date().getDate() - DIAS_MAXIMOS_VIGENCIA_TRM));
    const fechaTransformada = this.datePipe.transform(fecha, 'yyyy-MM-dd');
    this.trmActual = this.trmService.consultarPorFuera(fechaTransformada);
  }

}
