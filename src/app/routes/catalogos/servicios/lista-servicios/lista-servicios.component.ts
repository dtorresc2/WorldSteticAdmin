import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
    for (let i = 0; i < 45; i++) {
      this.servicios.push({
        ID: (i + 1),
        DESCRIPCION: "Servicio Nuevo",
        MONTO: 12.32,
        ESTADO: 1,
      });
    }
  }

  crearServicio() {
    this.router.navigate(['catalogos/servicios', 'crear']);
  }

  editarServicio(id) {
    this.router.navigate(['catalogos/servicios', id, 'editar']);
  }
}
