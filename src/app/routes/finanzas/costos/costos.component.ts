import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { CompraService } from 'src/app/services/compras/compra.service';

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

    // let aux = await this.movimientoService.obtenerMovimiento(this.ID_FACTURA, id);
    let aux = await this.compraService.obtenerCompra(this.ID_COMPRA)
    this.compra.get('descripcion').setValue((<any>aux).DESCRIPCION);
    this.compra.get('monto').setValue(this.decimalPipe.transform((<any>aux).MONTO, '1.2-2'));
    this.compra.get('estado').setValue((<any>aux).ESTADO);

    // if (!this.compra.invalid) {
    //   let compraAux: Compra = {
    //     ID_FACTURA: this.ID_FACTURA,
    //     CARGO_ABONO: this.movimiento.get('cargo_abono').value,
    //     DESCRIPCION: this.movimiento.get('descripcion').value,
    //     MONTO: this.movimiento.get('monto').value,
    //     ESTADO: this.movimiento.get('estado').value,
    //     ID_USUARIO: 3,
    //   }
    // }

  }
}