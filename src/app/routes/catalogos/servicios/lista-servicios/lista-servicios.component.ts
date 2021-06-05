import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/catalogos/servicios/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css']
})
export class ListaServiciosComponent implements OnInit {
  servicios = [];
  // Paginacion
  page = 1;
  pageSize = 10;

  carga: boolean = false;

  filtro: any = '';

  constructor(
    private router: Router,
    private servicioServices: ServiciosService
  ) { }

  async ngOnInit() {
    await this.obtenerServicios();
  }

  async obtenerServicios(): Promise<any> {
    this.carga = false;
    this.servicios = await this.servicioServices.obtenerServicios();
    this.carga = true;
    return true;
  }

  crearServicio() {
    this.router.navigate(['catalogos/servicios', 'crear']);
  }

  editarServicio(id) {
    this.router.navigate(['catalogos/servicios', id, 'editar']);
  }

  eliminarServicio(id) {
    Swal.fire({
      title: '¿Desea eliminar el servicio?',
      text: "No se puede revertir esta accion.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2a3848',
      cancelButtonColor: '#dd4236',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let respuesta = await this.servicioServices.eliminarServicio(id);
        if ((<any>respuesta.ESTADO == 1)) {
          Swal.fire({
            title: 'Servicios',
            text: 'Servicio eliminado correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
          await this.obtenerServicios();
        }
        else {
          Swal.fire({
            title: 'Servicios',
            text: 'Fallo al eliminar',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
        }
      }
    });
  }
}
