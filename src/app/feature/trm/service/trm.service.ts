import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { Trm } from '../modelo/trm';

@Injectable()
export class TrmService {

  constructor(protected http: HttpService) { }

  public consultarPorFuera(fecha: string) {
    const query = `SELECT * WHERE vigenciadesde>="${fecha}" ORDER BY vigenciahasta DESC`;
    const httpParams = new HttpParams().set('$query', query);
    return this.http.doGetParameters<Trm[]>(`${environment.urlTrm}`, httpParams, this.http.optsTrm(`${environment.tokenTrm}`));
  }
}
