import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerServicios(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.API_URL + 'servicios').toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }
}