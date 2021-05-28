import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/catalogos/clientes/clientes.service';
import { FechaService } from 'src/app/services/utils/fecha.service';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {
  modoEdicion: boolean = false;
  ID_CLIENTE: any = 0;

  cliente: FormGroup;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private clienteService: ClientesService,
    private decimalPipe: DecimalPipe,
    private fechaService: FechaService
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
    this.cliente.get('nit').setValue((<any>valores).NIT);
    this.cliente.get('telefono').setValue((<any>valores).TELEFONO);
    this.cliente.get('correo').setValue((<any>valores).CORREO);
    this.cliente.get('fecha_nacimiento').setValue(this.fechaService.fechaFormToBD((<any>valores).FECHA_NACIMIENTO));
    this.cliente.get('saldo').setValue(this.decimalPipe.transform((<any>valores).SALDO_ACTUAL, '1.2-2'));
    this.cliente.get('estado').setValue((<any>valores).ESTADO);
  }

  registrarCliente() {
    let cliente: Cliente = {
      NOMBRE: this.cliente.get('nombre').value,
      DIRECCION: this.cliente.get('direccion').value,
      NIT: this.cliente.get('nit').value,
      TELEFONO: this.cliente.get('telefono').value,
      CORREO: this.cliente.get('correo').value,
      FECHA_NACIMIENTO: this.cliente.get('fecha_nacimiento').value,
      ESTADO: Number.parseInt(this.cliente.get('estado').value)
    }

    console.log(cliente);
  }
}