import { Observable, of } from 'rxjs';
import { AccionConfirmado, IAlertaService } from './alerta.service';

export class AlertaServiceMock extends IAlertaService {
    valorConfirmacion = false;

    constructor(private spy: IAlertaService) {
        super();
     }

    exito(mensaje: string): Observable<AccionConfirmado> {
        this.spy.exito(mensaje);
        return of({ confirmado: this.valorConfirmacion });
    }

    errorInesperado(mensaje: string): void {
        this.spy.errorInesperado(mensaje);
    }

    informativa(titulo: string, html: string): Observable<AccionConfirmado> {
        this.spy.informativa(titulo, html);
        return of({ confirmado: this.valorConfirmacion });
    }

    confirmacion(titulo: string) {
        this.spy.confirmacion(titulo);
        return of({ confirmado: this.valorConfirmacion });
    }

    fueConfirmado(): void {
        this.valorConfirmacion = true;
    }

    fueCancelado(): void {
        this.valorConfirmacion = false;
    }
}
