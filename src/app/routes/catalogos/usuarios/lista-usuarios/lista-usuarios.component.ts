import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/catalogos/usuarios/usuarios.service';

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
    await this.obtenerServicios();
  }

  async obtenerServicios(): Promise<any> {
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
}