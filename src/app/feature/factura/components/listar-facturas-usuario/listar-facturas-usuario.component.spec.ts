import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListarFacturasUsuarioComponent } from './listar-facturas-usuario.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { FacturaService } from '@factura/shared/service/factura.service';
import { Factura } from '@factura/shared/model/factura';
import { IAlertaService } from '@core/services/alertas/alerta.service';
import { Router } from '@angular/router';
import { AlertaServiceMock } from '@core/services/alertas/alerta.service-mock';

describe('ListarFacturasUsuarioComponent', () => {
  let component: ListarFacturasUsuarioComponent;
  let fixture: ComponentFixture<ListarFacturasUsuarioComponent>;
  let facturaService: FacturaService;
  let alertaSpy: IAlertaService;

  let mockRouter = {
    
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
    getCurrentNavigation: () => {
      return {
         extras: {
            state:{
              idUsuarioInput: 1
            }
          }
        }
      }
  }

  beforeEach(waitForAsync(() => {
    alertaSpy = {
      informativa: jasmine.createSpy('informativa'),
      confirmacion: null,
      errorInesperado: jasmine.createSpy('El producto ya fue cargado en la lista de compra.'),
      exito: jasmine.createSpy('Se ha creado la factura correctamente.')
    };
    TestBed.configureTestingModule({
      declarations: [ListarFacturasUsuarioComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [FacturaService, HttpService,{provide: Router, useValue: mockRouter},{provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy)} ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    let listaFacturas: Factura[] = [new Factura(1,"1",null,null,null,null), new Factura(2,"1",null,null,null,null)];
    fixture = TestBed.createComponent(ListarFacturasUsuarioComponent);
    component = fixture.componentInstance;
    facturaService = TestBed.inject(FacturaService);
    fixture.detectChanges();
    spyOn(facturaService, 'consultarPorUsuario').and.returnValue(
      of(listaFacturas)
    );

    spyOn(facturaService, 'eliminar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    let lista: Factura[] = [new Factura(1,"1",null,null,null,null), new Factura(2,"1",null,null,null,null)];
    component.listaFacturas = lista;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(2).toBe(component.listaFacturas.length);
  });

  it('should delete invoice', () => {
    let lista: Factura[] = [new Factura(1,"1",null,null,null,null), new Factura(2,"1",null,null,null,null)];
    component.listaFacturas = lista;
    component.eliminarFactura(1,component.listaFacturas[1]);
    fixture.detectChanges();
    expect(1).toBe(component.listaFacturas.length);
  });

});
