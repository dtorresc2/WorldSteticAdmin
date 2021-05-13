import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-servicios',
  templateUrl: './form-servicios.component.html',
  styleUrls: ['./form-servicios.component.css']
})
export class FormServiciosComponent implements OnInit {
  modoEdicion: boolean = false;
  ID_SERVICIO: any = 0;

  servicio: FormGroup

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.servicio = new FormGroup({
      descripcion: new FormControl('')
      // descripcion: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      // precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{2})$'), Validators.maxLength(7)]),
      // cantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9][0-9]*$')]),
      // descuento: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{2})$'), Validators.maxLength(7)]),
      // cantidad_minima: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$'), Validators.maxLength(11)]),
      // categoria: new FormControl('', Validators.required)
      // imagen: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.modoEdicion = true;
      this.ID_SERVICIO = params.id;
      // console.log(params.id);
    }
    else {
      this.modoEdicion = false;
      // this.router.navigate(['catalogos', 'clientes']);
    }
  }

}