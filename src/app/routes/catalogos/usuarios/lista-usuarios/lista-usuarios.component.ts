import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    for (let i = 0; i < 45; i++) {
      this.usuarios.push({
        ID: (i + 1),
        USUARIO: "dtorresc",
        TIPO: 1,
        ESTADO: 1,
      });
    }
  }

  crearUsuario() {
    this.router.navigate(['catalogos/usuarios', 'crear']);
  }

  editarUsuario(id) {
    this.router.navigate(['catalogos/usuarios', id, 'editar']);
  }


}
