import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Cliente } from 'src/app/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  HEADERS: any;

  constructor(private http: HttpClient) {

  }

  obtenerClientes(): Promise<any> {
    this.HEADERS = new HttpHeaders();
    this.HEADERS.set('Content-Type', 'application/json; charset=utf-8');
    this.HEADERS.set('Access-Control-Allow-Origin', '*');

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
    this.HEADERS = new HttpHeaders();
    this.HEADERS.set('Content-Type', 'application/json; charset=utf-8');
    this.HEADERS.set('Access-Control-Allow-Origin', '*');

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

  registrarCliente(cliente: Cliente): Promise<any> {
    console.log (cliente);
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'clientes', cliente,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
        ).toPromise().then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          });
    });
  }
}
