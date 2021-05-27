import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ClientesService } from 'src/app/services/catalogos/clientes/clientes.service';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {
  modoEdicion: boolean = false;
  ID_CLIENTE: any = 0;
  model: NgbDateStruct;

  cliente: FormGroup;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private clienteService: ClientesService
  ) {
    this.cliente = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      direccion: new FormControl(''),
      nit: new FormControl('', [Validators.required, Validators.pattern('^[0-9][0-9]*$')]),
      telefono: new FormControl('', [Validators.required]),
      correo: new FormControl(''),
      fecha_nacimiento: new FormControl('', [Validators.required]),
      saldo: new FormControl(''),
      estado: new FormControl('')
    });
  }

  async ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.modoEdicion = true;
      this.ID_CLIENTE = params.id;
      this.rellenarFormulario(await this.clienteService.obtenerCliente(this.ID_CLIENTE));
    }
    else {
      this.modoEdicion = false;
    }
  }

  rellenarFormulario(valores) {
    this.cliente.get('nombre').setValue((<any>valores).NOMBRE);
    this.cliente.get('direccion').setValue((<any>valores).DIRECCION);
  }
}