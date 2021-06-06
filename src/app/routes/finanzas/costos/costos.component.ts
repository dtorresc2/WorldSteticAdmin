import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { CompraService } from 'src/app/services/compras/compra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-costos',
  templateUrl: './costos.component.html',
  styleUrls: ['./costos.component.css']
})
export class CostosComponent implements OnInit {
  costos = [];
  // Paginacion
  page = 1;
  pageSize = 10;

  carga: boolean = false;
  modoEdicion: boolean = false;
  filtro: any = '';

  compra: FormGroup;

  ID_COMPRA: any = 0;

  constructor(
    private compraService: CompraService,
    private decimalPipe: DecimalPipe,
    private activedRoute: ActivatedRoute
  ) {
    this.compra = new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{2})$')]),
      estado: new FormControl('', [Validators.required])
    });
  }

  async ngOnInit() {
    await this.obtenerCompras();
  }

  async obtenerCompras(): Promise<boolean> {
    this.carga = false;
    this.costos = await this.compraService.obtenerCompras();
    this.carga = true;
    return true;
  }

  iniciarFormulario() {
    this.modoEdicion = false;
    this.compra.reset();
    this.compra.get('estado').setValue('1');
  }

  async editarCompra(id) {
    this.modoEdicion = true;
    this.compra.reset();
    this.ID_COMPRA = id;

    let aux = await this.compraService.obtenerCompra(this.ID_COMPRA)
    this.compra.get('descripcion').setValue((<any>aux).DESCRIPCION);
    this.compra.get('monto').setValue(this.decimalPipe.transform((<any>aux).MONTO, '1.2-2'));
    this.compra.get('estado').setValue((<any>aux).ESTADO);
  }

  async registrarCompra() {
    if (!this.compra.invalid) {
      let compraAux: Compra = {
        ID_COMPRA: this.ID_COMPRA,
        DESCRIPCION: this.compra.get('descripcion').value,
        MONTO: this.compra.get('monto').value,
        ESTADO: this.compra.get('estado').value,
        ID_USUARIO: 3,
      }

      let respuesta = await this.compraService.registrarCompra(compraAux);
      if ((<any>respuesta.ESTADO == 1)) {
        Swal.fire({
          title: 'Compras',
          text: 'Compra registrada correctamente',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2a3848',
          showCloseButton: true
        });
      }
      else {
        Swal.fire({
          title: 'Compras',
          text: 'Fallo al registrar',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2a3848',
          showCloseButton: true
        });
      }
      await this.obtenerCompras();
    }
    else {
      Swal.fire({
        title: 'Compras',
        text: 'Faltan campos o hay datos incorrectos',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2a3848',
        showCloseButton: true
      });
    }
  }
}