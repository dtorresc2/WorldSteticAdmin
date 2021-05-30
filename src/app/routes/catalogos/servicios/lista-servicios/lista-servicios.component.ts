import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/catalogos/servicios/servicios.service';

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
}
