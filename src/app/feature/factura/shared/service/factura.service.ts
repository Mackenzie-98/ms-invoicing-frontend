import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Factura } from '../model/factura';


@Injectable()
export class FacturaService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Factura[]>(`${environment.endpoint}/facturas`, this.http.optsName('consultar facturas'));
  }

  public consultarPorUsuario(idUsuario: number) {
    return this.http.doGet<Factura[]>(`${environment.endpoint}/facturas/usuario/${idUsuario}`, this.http.optsName('consultar facturas por usuario'));
  }

  public guardar(factura: Factura) {
    return this.http.doPost<Factura, boolean>(`${environment.endpoint}/facturas`, factura,
                                                this.http.optsName('crear facturas'));
  }

  public eliminar(factura: Factura) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/facturas/${factura.id}`,
                                                 this.http.optsName('eliminar usuarios'));
  }
}
