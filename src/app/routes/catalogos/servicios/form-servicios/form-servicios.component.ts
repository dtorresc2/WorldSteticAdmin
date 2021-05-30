import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio';
import { ServiciosService } from 'src/app/services/catalogos/servicios/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-servicios',
  templateUrl: './form-servicios.component.html',
  styleUrls: ['./form-servicios.component.css']
})
export class FormServiciosComponent implements OnInit {
  modoEdicion: boolean = false;
  ID_SERVICIO: any = 0;

  servicio: FormGroup;

  carga: boolean = false;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private servicioService: ServiciosService,
    private decimalPipe: DecimalPipe
  ) {
    this.servicio = new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{2})$')]),
      estado: new FormControl('', [Validators.required])
    });
  }

  async ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.modoEdicion = true;
      this.ID_SERVICIO = params.id;
      this.rellenarFormulario(await this.servicioService.obtenerServicio(this.ID_SERVICIO));
    }
    else {
      this.modoEdicion = false;
      this.servicio.get('estado').setValue('1');
    }
  }

  rellenarFormulario(valores) {
    this.servicio.get('estado').setValue((<any>valores).ESTADO);
    this.servicio.get('descripcion').setValue((<any>valores).DESCRIPCION);
    this.servicio.get('monto').setValue(this.decimalPipe.transform((<any>valores).MONTO, '1.2-2'));
    this.carga = true;
  }

  async registrarServicio() {
    let servicio: Servicio = {
      DESCRIPCION: this.servicio.get('descripcion').value,
      ESTADO: Number.parseInt(this.servicio.get('estado').value),
      MONTO: Number.parseInt(this.servicio.get('monto').value)
    }
    console.log(servicio);

    if (!this.modoEdicion) {
      let respuesta = await this.servicioService.registrarServicio(servicio);
      if ((<any>respuesta.ESTADO == 1)) {
        Swal.fire({
          title: 'Servicios',
          text: 'Servicio registrado correctamente',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2a3848',
          showCloseButton: true
        });
        this.router.navigate(['catalogos', 'servicios']);
      }
      else {
        Swal.fire({
          title: 'Servicios',
          text: 'Fallo al registrar',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2a3848',
          showCloseButton: true
        });
      }
    }
  }

}