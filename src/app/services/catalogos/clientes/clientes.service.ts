import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  HEADERS: any;

  constructor(private http: HttpClient) {
    this.HEADERS = new HttpHeaders();
    this.HEADERS.set('Content-Type', 'application/json; charset=utf-8');
  }

  obtenerClientes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.API_URL + 'clientes', { headers: this.HEADERS }).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }

  obtenerCliente(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.API_URL + 'clientes/' + id, { headers: this.HEADERS }).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }
}
