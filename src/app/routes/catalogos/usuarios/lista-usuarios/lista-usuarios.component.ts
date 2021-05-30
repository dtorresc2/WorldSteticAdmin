import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/catalogos/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios = [];
  // Paginacion
  page = 1;
  pageSize = 10;

  carga: boolean = false;

  constructor(
    private router: Router,
    private usuarioService: UsuariosService
  ) { }

  async ngOnInit() {
    await this.obtenerUsuarios();
  }

  async obtenerUsuarios(): Promise<any> {
    this.carga = false;
    this.usuarios = await this.usuarioService.obtenerUsuarios();
    this.carga = true;
    return true;
  }

  crearUsuario() {
    this.router.navigate(['catalogos/usuarios', 'crear']);
  }

  editarUsuario(id) {
    this.router.navigate(['catalogos/usuarios', id, 'editar']);
  }

  eliminarUsuario(id) {
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      text: "No se puede revertir esta accion.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2a3848',
      cancelButtonColor: '#dd4236',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let respuesta = await this.usuarioService.eliminarUsuario(id);
        if ((<any>respuesta.ESTADO == 1)) {
          Swal.fire({
            title: 'Usuarios',
            text: 'Usuario eliminado correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
          await this.obtenerUsuarios();
        }
        else {
          Swal.fire({
            title: 'Usuarios',
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