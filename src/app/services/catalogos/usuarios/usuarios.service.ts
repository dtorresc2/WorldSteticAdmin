import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerUsuarios(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.API_URL + 'usuarios').toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }

  obtenerUsuario(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.API_URL + 'usuarios/' + id).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }
}
