import { TestBed } from '@angular/core/testing';

import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { TrmService } from './trm.service';
const apiEndpointTrm = `${environment.urlTrm}`;
import { Trm } from '../modelo/trm';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

describe('TrmService', () => {
  let httpMock: HttpTestingController;
  let service: TrmService;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrmService, HttpService ]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(TrmService);
  });

  it('should be created', () => {
    const trmService: TrmService = TestBed.inject(TrmService);
    expect(trmService).toBeTruthy();
  });

  it('deberia listar el trm', () => {
    const datePipe = new DatePipe('de-DE');
    const dummyTrm = [
      new Trm('$3,956.32', '2022-01-26', '2022-01-26'), new Trm('$3,956.32', '2022-01-26', '2022-01-26')
    ];
    const DIAS_MAXIMOS_VIGENCIA_TRM = 4;
    const fecha = new Date(new Date().setDate(new Date().getDate() - DIAS_MAXIMOS_VIGENCIA_TRM));
    const fechaTransformada = datePipe.transform(fecha, 'yyyy-MM-dd');
    service.consultarPorFuera(fechaTransformada).subscribe(personas => {
      expect(personas).toEqual(dummyTrm);
    });
    const req = httpMock.expectOne(apiEndpointTrm + '?$query=SELECT%20*%20WHERE%20vigenciadesde%3E=%22' + fechaTransformada + '%22%20ORDER%20BY%20vigenciahasta%20DESC');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTrm);
  });
});
