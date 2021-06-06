import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movimiento } from 'src/app/models/movimiento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerMovimientos(): Promise<any> {
    let movimiento: Movimiento = {
      ID_FACTURA: 0
    };

    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'facturas-movimiento/listar', movimiento).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }
}
