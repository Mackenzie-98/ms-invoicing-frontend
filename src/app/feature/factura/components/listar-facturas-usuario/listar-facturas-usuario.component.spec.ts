import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListarFacturasUsuarioComponent } from './listar-facturas-usuario.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { FacturaService } from '@factura/shared/service/factura.service';
import { Factura } from '@factura/shared/model/factura';
import { AlertaService, IAlertaService } from '@core/services/alertas/alerta.service';
import { Router } from '@angular/router';

describe('ListarFacturasUsuarioComponent', () => {
  let component: ListarFacturasUsuarioComponent;
  let fixture: ComponentFixture<ListarFacturasUsuarioComponent>;
  let facturaService: FacturaService;
  const listaFacturas: Factura[] = [new Factura(1,"1",null,null,null,null), new Factura(2,"1",null,null,null,null)];
  let router: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarFacturasUsuarioComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [FacturaService, HttpService,AlertaService, IAlertaService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { idUsuarioInput: 1} } } as any);
    fixture = TestBed.createComponent(ListarFacturasUsuarioComponent);
    component = fixture.componentInstance;
    facturaService = TestBed.inject(FacturaService);
    fixture.detectChanges();
    spyOn(facturaService, 'consultar').and.returnValue(
      of(listaFacturas)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaFacturas.subscribe(resultado => {
      expect(2).toBe(resultado.length);
  });
});

});
