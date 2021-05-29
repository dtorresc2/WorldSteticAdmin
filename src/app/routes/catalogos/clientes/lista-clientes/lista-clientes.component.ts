import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/catalogos/clientes/clientes.service';

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
  carga: boolean = false;

  constructor(private router: Router, private clienteService: ClientesService) { }

  async ngOnInit() {
    this.clientes = await this.clienteService.obtenerClientes();
    this.carga = true;
  }

  crearCliente() {
    this.router.navigate(['catalogos/clientes', 'crear']);
  }

  editarCliente(id) {
    this.router.navigate(['catalogos/clientes', id, 'editar']);
  }
}