import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movimiento } from 'src/app/models/movimiento';
import { MovimientoService } from 'src/app/services/facturas/movimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimientos-facturas',
  templateUrl: './movimientos-facturas.component.html',
  styleUrls: ['./movimientos-facturas.component.css']
})
export class MovimientosFacturasComponent implements OnInit {
  movimientos = [];
  // Paginacion
  page = 1;
  pageSize = 10;

  ID_FACTURA: any = 0;

  carga: boolean = false;
  movimiento: FormGroup;

  modoEdicion: boolean = false;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private movimientoService: MovimientoService,
    private decimalPipe: DecimalPipe
  ) {
    this.movimiento = new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{2})$')]),
      cargo_abono: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required])
    });
  }

  async ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.ID_FACTURA = params.id;
      await this.obtenerMovimientos(params.id);
    }
  }

  async obtenerMovimientos(id): Promise<boolean> {
    this.carga = false;
    this.movimientos = await this.movimientoService.obtenerMovimientos(id);
    this.carga = true;
    return false;
  }

  async editarMovimiento(id) {
    this.modoEdicion = true;
    this.movimiento.reset();
    let aux = await this.movimientoService.obtenerMovimiento(this.ID_FACTURA, id);
    this.movimiento.get('cargo_abono').setValue((<any>aux).CARGO_ABONO);
    this.movimiento.get('descripcion').setValue((<any>aux).DESCRIPCION);
    this.movimiento.get('monto').setValue(this.decimalPipe.transform((<any>aux).MONTO, '1.2-2'));
    this.movimiento.get('estado').setValue((<any>aux).ESTADO);

    if (!this.movimiento.invalid) {
      let movimientoAux: Movimiento = {
        ID_FACTURA: this.ID_FACTURA,
        CARGO_ABONO: this.movimiento.get('cargo_abono').value,
        DESCRIPCION: this.movimiento.get('descripcion').value,
        MONTO: this.movimiento.get('monto').value,
        ESTADO: this.movimiento.get('estado').value,
        ID_USUARIO: 3,
      }
    }

  }

  iniciarFormulario() {
    this.modoEdicion = false;
    this.movimiento.reset();
    this.movimiento.get('cargo_abono').setValue('C');
    this.movimiento.get('estado').setValue('1');
  }

  async registrarMovimiento() {
    if (!this.movimiento.invalid) {
      let movimientoAux: Movimiento = {
        ID_FACTURA: this.ID_FACTURA,
        CARGO_ABONO: this.movimiento.get('cargo_abono').value,
        DESCRIPCION: this.movimiento.get('descripcion').value,
        MONTO: this.movimiento.get('monto').value,
        ESTADO: this.movimiento.get('estado').value,
        ID_USUARIO: 3,
      }

      let respuesta = await this.movimientoService.registrarMovimiento(movimientoAux);
      if ((<any>respuesta.ESTADO == 1)) {
        Swal.fire({
          title: 'Movimientos',
          text: 'Movimiento registrado correctamente',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2a3848',
          showCloseButton: true
        });
      }
      else {
        Swal.fire({
          title: 'Movimientos',
          text: 'Fallo al registrar',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2a3848',
          showCloseButton: true
        });
      }
      await this.obtenerMovimientos(this.ID_FACTURA);
    }
    else {
      Swal.fire({
        title: 'Movimientos',
        text: 'Faltan campos o hay datos incorrectos',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2a3848',
        showCloseButton: true
      });
    }
  }

  async actualizarMovimiento(id) {
    if (!this.movimiento.invalid) {
      let movimientoAux: Movimiento = {
        ID_MOVIMIENTO: id,
        CARGO_ABONO: this.movimiento.get('cargo_abono').value,
        DESCRIPCION: this.movimiento.get('descripcion').value,
        MONTO: this.movimiento.get('monto').value,
        ESTADO: this.movimiento.get('estado').value,
        ID_USUARIO: 3,
      }

      let respuesta = await this.movimientoService.actualizarMovimiento(movimientoAux);
      if ((<any>respuesta.ESTADO == 1)) {
        Swal.fire({
          title: 'Movimientos',
          text: 'Movimiento actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2a3848',
          showCloseButton: true
        });
      }
      else {
        Swal.fire({
          title: 'Movimientos',
          text: 'Fallo al actualizar',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2a3848',
          showCloseButton: true
        });
      }
      await this.obtenerMovimientos(this.ID_FACTURA);
    }
    else {
      Swal.fire({
        title: 'Movimientos',
        text: 'Faltan campos o hay datos incorrectos',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2a3848',
        showCloseButton: true
      });
    }
  }
}
