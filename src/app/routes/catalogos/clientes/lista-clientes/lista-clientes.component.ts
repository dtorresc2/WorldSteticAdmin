import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/catalogos/clientes/clientes.service';
import Swal from 'sweetalert2';

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

  constructor(
    private router: Router,
    private clienteService: ClientesService
  ) { }

  async ngOnInit() {
    await this.obtenerClientes();
  }

  async obtenerClientes():Promise<any> {
    this.carga = false;
    this.clientes = await this.clienteService.obtenerClientes();
    this.carga = true;
  }

  crearCliente() {
    this.router.navigate(['catalogos/clientes', 'crear']);
  }

  editarCliente(id) {
    this.router.navigate(['catalogos/clientes', id, 'editar']);
  }

  eliminarCliente(id) {
    Swal.fire({
      title: '¿Desea eliminar el cliente?',
      text: "No se puede revertir esta accion.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2a3848',
      cancelButtonColor: '#dd4236',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let respuesta = await this.clienteService.eliminarCliente(id);
        if ((<any>respuesta.ESTADO == 1)) {
          Swal.fire({
            title: 'Clientes',
            text: 'Cliente eliminado correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
          await this.obtenerClientes();
        }
        else {
          Swal.fire({
            title: 'Clientes',
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