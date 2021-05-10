import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent implements OnInit {
  modoEdicion: boolean = false;
  ID_USUARIO: any = 0;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.modoEdicion = true;
      this.ID_USUARIO = params.id;
      // console.log(params.id);
    }
    else {
      this.modoEdicion = false;
      // this.router.navigate(['catalogos', 'clientes']);
    }
  }

}
