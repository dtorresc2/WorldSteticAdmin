import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  clientes = [];
  // Paginacion
  page = 1;
  pageSize = 10;

  constructor(private router: Router) { }

  ngOnInit(): void {
    for (let i = 0; i < 45; i++) {
      this.clientes.push({
        ID: (i + 1),
        NOMBRE: "Diego Roberto Torres Claros",
        NIT: "1232112312",
        SALDO: 12.32,
        ESTADO: 1,
      });
    }
  }

  crearCliente() {
    this.router.navigate(['catalogos/clientes', 'crear']);
  }

  editarCliente(id) {
    this.router.navigate(['catalogos/clientes', id, 'editar']);
  }

}
