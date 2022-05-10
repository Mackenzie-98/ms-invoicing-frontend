import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import {  FormsModule } from '@angular/forms';
import { FacturaService } from '@factura/shared/service/factura.service';
import { IAlertaService } from '@core/services/alertas/alerta.service';
import { Router } from '@angular/router';
import { DetalleFacturaComponent } from './detalle-factura.component';
import { Factura } from '@factura/shared/model/factura';
import { Usuario } from '@usuario/shared/model/usuario';

describe('CrearFacturaComponent', () => {
  let component: DetalleFacturaComponent;
  let fixture: ComponentFixture<DetalleFacturaComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [ DetalleFacturaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [FacturaService, HttpService, { provide: IAlertaService}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    let user = new Usuario(1, 'test','1234',null);
    let factura = new Factura(1,"test",user,null,null,0);
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { facturaInput: factura} } } as any);
    fixture = TestBed.createComponent(DetalleFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
