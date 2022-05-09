import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

export abstract class IAlertaService {
    abstract errorInesperado(mensaje: string): void;
    abstract confirmacion(titulo: string): Observable<AccionConfirmado>;
    abstract informativa(titulo: string, html: string): Observable<AccionConfirmado>;
    abstract exito(mensaje: string): Observable<AccionConfirmado>;
}

@Injectable()
export class AlertaService extends IAlertaService {
    errorInesperado(mensaje: string) {
        Swal.fire({
            title: 'Error',
            text: mensaje,
            icon: 'error'
        });
    }

    exito(mensaje: string): Observable<AccionConfirmado> {
        return from(
            Swal.fire({
                title: 'Éxito',
                text: mensaje,
                icon: 'success'
            })
        ).pipe(switchMap(a => of({ confirmado: a.isConfirmed })));
    }

    confirmacion(titulo: string): Observable<AccionConfirmado> {
        return from(
            Swal.fire({
                title: titulo,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si!'
            })
        ).pipe(switchMap(a => of({ confirmado: a.isConfirmed })));
    }

    informativa(titulo: string, html: string): Observable<AccionConfirmado> {
        return from(
            Swal.fire({
                html,
                title: titulo,
                icon: 'info',
                confirmButtonText: 'Aceptar'
            })
        ).pipe(switchMap(a => of({ confirmado: a.isConfirmed })));
    }
}

export interface AccionConfirmado {
    confirmado: boolean;
}
