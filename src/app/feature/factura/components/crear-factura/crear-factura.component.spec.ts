import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FacturaService } from '@factura/shared/service/factura.service';
import { CrearFacturaComponent } from './crear-factura.component';
import { IAlertaService } from '@core/services/alertas/alerta.service';
import { AlertaServiceMock } from '@core/services/alertas/alerta.service-mock';
import { ProductoService } from '@producto/shared/service/producto.service';
import { Router } from '@angular/router';
import { Usuario } from '@usuario/shared/model/usuario';
import { Producto } from '@producto/shared/model/producto';

describe('CrearFacturaComponent', () => {
  let component: CrearFacturaComponent;
  let fixture: ComponentFixture<CrearFacturaComponent>;
  let facturaService: FacturaService;
  let pruductoService: ProductoService;
  let alertaSpy: IAlertaService;
  let router: jasmine.SpyObj<Router>;
  const listaProductos: Producto[] = [new Producto(1, 'Producto 1',1500), new Producto(2, 'Producto 2',2000)];

  beforeEach(waitForAsync(() => {
    alertaSpy = {
        informativa: jasmine.createSpy('informativa'),
        confirmacion: null,
        errorInesperado: jasmine.createSpy('errorInesperado'),
        exito: jasmine.createSpy('Se ha creado la factura correctamente.')
      };
    TestBed.configureTestingModule({
      declarations: [ CrearFacturaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [FacturaService, HttpService, ProductoService, { provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy) }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    let user = new Usuario(1,"test","1234",null);
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { usuarioInput: user} } } as any);
    fixture = TestBed.createComponent(CrearFacturaComponent);
    component = fixture.componentInstance;
    facturaService = TestBed.inject(FacturaService);

    spyOn(facturaService, 'guardar').and.returnValue(
      of(true)
    );
    pruductoService = TestBed.inject(ProductoService);
    spyOn(pruductoService, 'consultar').and.returnValue(
        of(listaProductos)
      );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw succes alert', () => {
    component.facturar();
    expect(alertaSpy.exito).toHaveBeenCalled();
  });

});
