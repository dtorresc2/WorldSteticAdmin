import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
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

  registrarUsuario(usuario: Usuario): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'usuarios', usuario,
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

  actualizarUsuario(id, usuario: Usuario): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(environment.API_URL + 'usuarios/' + id, usuario,
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
