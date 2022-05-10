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
import { Producto } from '@producto/shared/model/producto';
import { Usuario } from '@usuario/shared/model/usuario';
import { ProductoVenta } from '@factura/shared/model/ProductoVenta';

describe('CrearFacturaComponent', () => {
  let component: CrearFacturaComponent;
  let fixture: ComponentFixture<CrearFacturaComponent>;
  let facturaService: FacturaService;
  let pruductoService: ProductoService;
  let alertaSpy: IAlertaService;
  let user = new Usuario(1,"test","1234",null);
  let mockRouter = {
    
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
    getCurrentNavigation: () => {
      return {
         extras: {
            state:{
                usuarioInput: user
            }
          }
        }
      }
  }
  const listaProductos: Producto[] = [new Producto(1, 'Producto 1',1500), new Producto(2, 'Producto 2',2000)];
  
  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {
    alertaSpy = {
        informativa: jasmine.createSpy('informativa'),
        confirmacion: null,
        errorInesperado: jasmine.createSpy('El producto ya fue cargado en la lista de compra.'),
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
      providers: [FacturaService, HttpService, ProductoService, {provide: Router, useValue: mockRouter},{provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy)}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
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

  it('should delete items from carritoCompras', () => {
    let carrito: ProductoVenta[] = [new ProductoVenta(1,new Producto(1, 'Producto 1',1500),1),new ProductoVenta(2,new Producto(1, 'Producto 2',1500),2)];
    component.carritoCompras = carrito;
    component.deleteFieldValue(1);
    fixture.detectChanges();
    expect(component.carritoCompras.length).toBe(1);
  });

  it('should verify duplicty', () => {
    let carrito: ProductoVenta[] = [new ProductoVenta(1,new Producto(1, 'Producto 1',1500),1),new ProductoVenta(2,new Producto(1, 'Producto 2',1500),2)];
    component.carritoCompras = carrito;
    expect(component.verificarDuplicidad(new Producto(1, 'Producto 1',1500),carrito)).toBe(true);
  });

  it('should set description', () => {
    component.setDescripcion("test");
    expect(component.descripcion).toBe("test");
  });

  it('should calculate total from carritoCompras', () => {
    let carrito: ProductoVenta[] = [new ProductoVenta(1,new Producto(1, 'Producto 1',1500),1),new ProductoVenta(2,new Producto(1, 'Producto 2',1500),2)];
    component.carritoCompras = carrito;
    component.calcularTotal();
    expect(component.total).toBe(4500);
  });

  it('should set quantity from item and index i', () => {
    let carrito: ProductoVenta[] = [new ProductoVenta(1,new Producto(1, 'Producto 1',1500),1),new ProductoVenta(2,new Producto(1, 'Producto 2',1500),2)];
    component.carritoCompras = carrito;
    component.setCantidad(0,1000);
    expect(component.carritoCompras[0].cantidad).toBe(1000);
  });

  it('should throw error', () => {
    let carrito: ProductoVenta[] = [new ProductoVenta(1,new Producto(1, 'Producto 1',1500),1),new ProductoVenta(2,new Producto(1, 'Producto 2',1500),2)];
    let lista: Producto[] = [new Producto(1, 'Producto 1',1500), new Producto(1, 'Producto 2',1500)];
    component.carritoCompras = carrito;
    component.listaProductos = lista;
    component.onChange(1);
    expect(alertaSpy.errorInesperado).toHaveBeenCalled()
  });

});

