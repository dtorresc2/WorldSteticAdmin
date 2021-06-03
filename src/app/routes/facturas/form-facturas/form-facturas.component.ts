import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng-select2';

import { Options } from 'select2';
import { nitMatchValidator } from 'src/app/functions/validacionNit';
import { FacturaDetalle } from 'src/app/models/facturaDetalle';
import { ClientesService } from 'src/app/services/catalogos/clientes/clientes.service';
import { ServiciosService } from 'src/app/services/catalogos/servicios/servicios.service';
import { FacturaService } from 'src/app/services/facturas/factura.service';
import { FechaService } from 'src/app/services/utils/fecha.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-facturas',
  templateUrl: './form-facturas.component.html',
  styleUrls: ['./form-facturas.component.css']
})
export class FormFacturasComponent implements OnInit {
  modoEdicion: boolean = false;
  modoEdicionServicio: boolean = false;
  indexDetalle = 0;

  ID_FACTURA: any = 0;
  model: NgbDateStruct;

  detalleFactura: Array<FacturaDetalle>;
  // Paginacion
  page = 1;
  pageSize = 10;

  id_cliente = '';
  id_servicio = '';

  catalogoClientes = [];
  catalogoServicios = [];

  active = 1;

  carga: boolean = false;

  formFactura: FormGroup;
  formServicio: FormGroup;

  total: number = 0.00;
  totalTexto;

  public exampleData: Array<Select2OptionData>;
  public options: Options;

  public formControl = new FormControl();

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private clienteService: ClientesService,
    private servicioService: ServiciosService,
    private facturaService: FacturaService,
    private decimalPipe: DecimalPipe,
    private fechaService: FechaService
  ) {
    this.formFactura = new FormGroup({
      serie: new FormControl('', [Validators.required]),
      numero_factura: new FormControl('', [Validators.required]),
      nombre_factura: new FormControl('', [Validators.required]),
      direccion_factura: new FormControl('', [Validators.required]),
      nit: new FormControl('', [Validators.required]),
      telefono: new FormControl('', []),
      saldo: new FormControl('', []),
      estado: new FormControl({ value: '', disabled: true }, [Validators.required]),
      credito: new FormControl('', [Validators.required]),
      cliente: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required])
    }, {
      validators: nitMatchValidator
    });

    this.formServicio = new FormGroup({
      servicio: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9][0-9]*$')]),
      // descripcion: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]),
      descripcion: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{2})$')]),
    });
  }

  async ngOnInit() {
    await this.obtenerCombos();

    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.modoEdicion = true;
      this.ID_FACTURA = params.id;
      await this.rellenarFormulario(this.ID_FACTURA);
      await this.rellenarDetalle(this.ID_FACTURA);
    }
    else {
      this.formFactura.get('estado').setValue('1');
      this.formFactura.get('credito').setValue('0');
      this.formFactura.get('fecha').setValue(this.fechaService.fechaActual());
      this.detalleFactura = [];
      this.modoEdicion = false;
    }

    this.formServicio.get('cantidad').setValue('1');
    this.carga = true;
  }

  async rellenarFormulario(id): Promise<boolean> {
    let valores = await this.facturaService.obtenerFactura(id);

    this.formFactura.get('serie').setValue((<any>valores).SERIE);
    this.formFactura.get('numero_factura').setValue((<any>valores).NUMERO_FACTURA);
    this.formFactura.get('nombre_factura').setValue((<any>valores).NOMBRE_FACTURA);
    this.formFactura.get('direccion_factura').setValue((<any>valores).DIRECCION_FACTURA);
    this.formFactura.get('nit').setValue((<any>valores).NIT);
    this.formFactura.get('telefono').setValue((<any>valores).TELEFONO);
    this.formFactura.get('fecha').setValue(this.fechaService.fechaFormToBD((<any>valores).FECHA_EMISION));
    this.formFactura.get('saldo').setValue(this.decimalPipe.transform((<any>valores).SALDO_ACTUAL, '1.2-2'));
    this.formFactura.get('estado').setValue((<any>valores).ESTADO);
    this.formFactura.get('credito').setValue((<any>valores).CONTADO_CREDITO);
    this.formFactura.get('cliente').setValue((<any>valores).ID_CLIENTE);

    return true;
  }

  async rellenarDetalle(id): Promise<boolean> {
    let valores = await this.facturaService.obtenerFacturaDetalle(id);
    this.detalleFactura = valores;
    this.ajustarIndice();
    return true;
  }

  async obtenerCombos(): Promise<boolean> {
    let listadoClientes = await this.clienteService.obtenerClientes();
    listadoClientes = listadoClientes.map(x => {
      let ID = x.ID_CLIENTE;
      let TEXT = x.NOMBRE;

      return {
        id: ID,
        text: TEXT
      }
    });

    this.catalogoClientes = listadoClientes;

    let listadoServicios = await this.servicioService.obtenerServicios();
    listadoServicios = listadoServicios.map(x => {
      let ID = x.ID_SERVICIO;
      let TEXT = x.DESCRIPCION;

      return {
        id: ID,
        text: TEXT
      }
    });

    this.catalogoServicios = listadoServicios;
    return true;
  }

  async selectService(event: string) {
    let listadoServicios = await this.servicioService.obtenerServicio(event);
    this.formServicio.get('descripcion').setValue((<any>listadoServicios).DESCRIPCION);
    this.formServicio.get('monto').setValue(this.decimalPipe.transform((<any>listadoServicios).MONTO, '1.2-2'));
  }

  agregarServicio() {
    if (!this.formServicio.invalid) {
      let monto: number = parseFloat(this.formServicio.get('monto').value) * parseFloat(this.formServicio.get('cantidad').value);

      let detalle: FacturaDetalle = {
        ID_SERVICIO: this.formServicio.get('servicio').value,
        ID_FACTURA: 0,
        CANTIDAD: this.formServicio.get('cantidad').value,
        BIEN_SERVICIO: 'S',
        DESCRIPCION: this.formServicio.get('descripcion').value,
        MONTO_UNITARIO: this.formServicio.get('monto').value,
        MONTO: monto
      }

      if (this.modoEdicionServicio) {
        this.detalleFactura.splice(this.indexDetalle, 1, detalle);
      }
      else {
        this.detalleFactura.push(detalle);
      }

      this.ajustarIndice();
      this.cancelar();
    }
    else {
      Swal.fire({
        title: 'Facturas',
        text: 'Campos vacios o incorrectos',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2a3848',
        showCloseButton: true
      });
    }
  }

  eliminarServicio(id) {
    this.detalleFactura.splice(id, 1);
    this.ajustarIndice();
  }

  editarServicio(id) {
    this.indexDetalle = id;
    this.modoEdicionServicio = true;

    let detalle = this.detalleFactura[id];

    setTimeout(() => {
      this.formServicio.get('descripcion').setValue(detalle.DESCRIPCION);
      this.formServicio.get('cantidad').setValue(detalle.CANTIDAD);
      this.formServicio.get('monto').setValue(detalle.MONTO_UNITARIO);
    }, 1000);

  }

  cancelar() {
    this.modoEdicionServicio = false;
    this.formServicio.get('servicio').setValue(0);
    this.formServicio.get('descripcion').setValue('');
    this.formServicio.get('cantidad').setValue(1);
    this.formServicio.get('monto').setValue('');
  }

  ajustarIndice() {
    this.total = 0;
    let auxTotal: number = 0.00;

    for (let i = 0; i < this.detalleFactura.length; i++) {
      this.detalleFactura[i].ID_DETALLE = (i + 1);
      auxTotal = auxTotal + (this.detalleFactura[i].MONTO * 1);
    }

    this.totalTexto = this.decimalPipe.transform(auxTotal, '1.2-2');
  }
}
