import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from 'src/app/models/compra';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerCompras(): Promise<any> {
    let compra: Compra = {
      ID_COMPRA: 0
    }

    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'compras/listar', compra).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }

  obtenerCompra(id): Promise<any> {
    let compra: Compra = {
      ID_COMPRA: id
    }

    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'compras/listar', compra).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }

  registrarCompra(compra: Compra): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'compras/registrar', compra).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }

}
