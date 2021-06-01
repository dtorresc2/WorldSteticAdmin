import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerFacturas(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'facturas/listar',{}).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }
}
