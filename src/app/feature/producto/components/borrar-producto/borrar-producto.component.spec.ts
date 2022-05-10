import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@core/services/http.service';
import {  CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BorrarProductoComponent } from './borrar-producto.component';
import { IAlertaService } from '@core/services/alertas/alerta.service';
import { ProductoService } from '@producto/shared/service/producto.service';
import { ProductoComponent } from '../producto/producto.component';
import { AlertaServiceMock } from '@core/services/alertas/alerta.service-mock';
import { Producto } from '@producto/shared/model/producto';

describe('BorrarProductoComponent', () => {

  let component: BorrarProductoComponent;
  let fixture: ComponentFixture<BorrarProductoComponent>;
  let productoService: ProductoService;
  let alertaSpy: IAlertaService;

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {
    alertaSpy = {
      informativa: jasmine.createSpy('informativa'),
      confirmacion: jasmine.createSpy('Esta seguro de eliminar este producto?'),
      errorInesperado: jasmine.createSpy('errorInesperado'),
      exito: jasmine.createSpy('Se ha eliminado el producto correctamente.')
    };
    TestBed.configureTestingModule({
      declarations: [ BorrarProductoComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: 'producto', component: ProductoComponent}]
        ),
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ProductoService, HttpService,
        {provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy)} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarProductoComponent);
    component = fixture.componentInstance;
    component.producto = new Producto(1 , 'producto test', 1000);
    productoService = TestBed.inject(ProductoService);
    fixture.detectChanges();
    spyOn(productoService, 'eliminar').and.returnValue(
      of( true )
     );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe borrar un produccto ', () => {
    component.borrarProducto();
    expect(alertaSpy.confirmacion).toHaveBeenCalled();
  });

});

