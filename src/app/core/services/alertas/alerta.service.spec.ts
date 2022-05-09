import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { AlertaService } from './alerta.service';
import { from, of } from 'rxjs';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';


describe('AlertService', () => {
  let service: AlertaService;


  beforeEach(() => {
     TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlertaService, HttpService]
    });
     service = TestBed.inject(AlertaService);
  });

  it('Debe crear el componente ', () => {
    const alertaService: AlertaService = TestBed.inject(AlertaService);
    expect(alertaService).toBeTruthy();
  });

  it('Debe mostrar el mensaje de exito ', () => {
    spyOn(service, 'exito').and.returnValue(
         from(
            Swal.fire({
                title: 'Éxito',
                text: 'mensaje',
                icon: 'success'
            })
        ).pipe(switchMap(a => of({ confirmado: a.isConfirmed })))
    );

    service.exito('mensaje');

    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle().textContent).toBe('Éxito');

  });

  it('Debe mostrar el mensaje de confirmacion ', () => {

    const mensajeConfirmacion = 'mensaje de confirmacion';
    spyOn(service, 'confirmacion').and.returnValue(
        from(
            Swal.fire({
                title: mensajeConfirmacion,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si!'
            })
        ).pipe(switchMap(a => of({ confirmado: a.isConfirmed })))
    );

    service.confirmacion(mensajeConfirmacion);

    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle().textContent).toBe(mensajeConfirmacion);

    expect(service).toBeTruthy();
  });

  it('Debe mostrar el mensaje informativo ', () => {
    spyOn(service, 'informativa').and.returnValue(
        from(
            Swal.fire({
                html: 'titulo',
                title: 'Error',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            })
        ).pipe(switchMap(a => of({ confirmado: a.isConfirmed })))
    );

    service.errorInesperado('mensaje informativo');

    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle().textContent).toBe('Error');

  });



});

