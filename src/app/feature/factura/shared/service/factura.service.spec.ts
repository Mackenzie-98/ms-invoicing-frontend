import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpResponse } from '@angular/common/http';
import { FacturaService } from './factura.service';
import { Factura } from '../model/factura';

describe('ProductoService', () => {
  let httpMock: HttpTestingController;
  let service: FacturaService;
  const apiEndpointFacturasConsulta = `${environment.endpoint}/facturas`;
  const apiEndpointFacturas= `${environment.endpoint}/facturas`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FacturaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(FacturaService);
  });

  it('should be created', () => {
    const facturaService: FacturaService = TestBed.inject(FacturaService);
    expect(facturaService).toBeTruthy();
  });

  it('deberia listar facturas', () => {
    const dummyFacturas = [
    new Factura(1,"1",null,null,null,0), new Factura(2,"1",null,null,null,0)
    ];
    service.consultar().subscribe(facturas => {
      expect(facturas.length).toBe(2);
      expect(facturas).toEqual(dummyFacturas);
    });
    const req = httpMock.expectOne(apiEndpointFacturasConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyFacturas);
  });

  it('deberia crear una factura', () => {
    const dummyFactura = new Factura(1,"test",null,null,null,0);
    service.guardar(dummyFactura).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointFacturas);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar una factura', () => {
    const dummyFactura = new Factura(1,"test",null,null,null,0);
    service.eliminar(dummyFactura).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointFacturas}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
