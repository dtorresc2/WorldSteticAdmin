import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {
  modoEdicion : boolean = false;
  ID_CLIENTE: any = 0;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.modoEdicion = true;
      this.ID_CLIENTE = params.id;
      // console.log(params.id);
    }
    else {
      this.modoEdicion = false;
      // this.router.navigate(['catalogos', 'clientes']);
    }
  }
}
