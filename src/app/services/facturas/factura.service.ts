import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerFacturas(): Promise<any> {
    let factura: Factura = {
      ID_FACTURA: 0
    };

    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'facturas/listar', factura).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }

  obtenerFactura(id): Promise<any> {
    let factura: Factura = {
      ID_FACTURA: id
    };

    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'facturas/listar', factura).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }
}
