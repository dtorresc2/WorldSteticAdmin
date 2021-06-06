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

  obtenerMovimientos(idFactura): Promise<any> {
    let movimiento: Movimiento = {
      ID_FACTURA: idFactura,
      ID_MOVIMIENTO: 0
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

  obtenerMovimiento(idFactura, idMovimiento): Promise<any> {
    let movimiento: Movimiento = {
      ID_FACTURA: idFactura,
      ID_MOVIMIENTO: idMovimiento
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

  registrarMovimiento(movimiento: Movimiento): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'facturas-movimiento/registrar', movimiento).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }

  actualizarMovimiento(movimiento: Movimiento): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'facturas-movimiento/actualizar', movimiento).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }

  anularMovimiento(id): Promise<any> {
    let movimiento: Movimiento = {
      ID_MOVIMIENTO: id
    };

    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'facturas-movimiento/anular', movimiento).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }

  habilitarMovimiento(id): Promise<any> {
    let movimiento: Movimiento = {
      ID_MOVIMIENTO: id
    };
    
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'facturas-movimiento/habilitar', movimiento).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }
}