import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
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

  obtenerServicio(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.API_URL + 'servicios/' + id).toPromise().then(
        res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        })
    });
  }

  registrarServicio(servicio: Servicio): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + 'servicios', servicio,
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

  actualizarServicio(id, servicio: Servicio): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(environment.API_URL + 'servicios/' + id, servicio,
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

  eliminarServicio(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.API_URL + 'servicios/' + id,
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