import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {
  modoEdicion: boolean = false;
  ID_CLIENTE: any = 0;
  model: NgbDateStruct;
  // model: NgbDateStruct;s

  cliente: FormGroup;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute
  ) 
  { 
    this.cliente = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(25)])
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
      this.ID_CLIENTE = params.id;
      // console.log(params.id);
    }
    else {
      this.modoEdicion = false;
      // this.router.navigate(['catalogos', 'clientes']);
    }
  }
}