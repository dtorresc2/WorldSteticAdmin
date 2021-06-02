import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { nitMatchValidator } from 'src/app/functions/validacionNit';
import { ClientesService } from 'src/app/services/catalogos/clientes/clientes.service';
import { ServiciosService } from 'src/app/services/catalogos/servicios/servicios.service';
import { FacturaService } from 'src/app/services/facturas/factura.service';
import { FechaService } from 'src/app/services/utils/fecha.service';

@Component({
  selector: 'app-form-facturas',
  templateUrl: './form-facturas.component.html',
  styleUrls: ['./form-facturas.component.css']
})
export class FormFacturasComponent implements OnInit {
  modoEdicion: boolean = false;
  ID_FACTURA: any = 0;
  model: NgbDateStruct;

  detalleFactura = [];
  // Paginacion
  page = 1;
  pageSize = 5;

  id_cliente = '';
  id_servicio = '';

  catalogoClientes = [];
  catalogoServicios = [];

  active = 1;

  carga: boolean = false;

  formFactura: FormGroup;
  formServicio: FormGroup;

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
      estado: new FormControl({ value: '', disabled: true}, [Validators.required]),
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
    this.carga = true;

    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.modoEdicion = true;
      this.ID_FACTURA = params.id;
      this.rellenarFormulario(await this.facturaService.obtenerFactura(this.ID_FACTURA));
      // console.log(await this.facturaService.obtenerFactura(this.ID_FACTURA));

      // for (let i = 0; i < 25; i++) {
      //   this.detalleFactura.push({
      //     ID: (i + 1),
      //     CODIGO: (2 * i),
      //     NUMERO: (i + 1),
      //     CANTIDAD: (i + 3),
      //     DESCRIPCION: "Servicios 123123",
      //     MONTO_UNITARIO: 5.25,
      //     MONTO: 25.25,
      //   });
      // }
    }
    else {
      this.modoEdicion = false;
    }
  }

  rellenarFormulario(valores) {
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
    this.carga = true;
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
    // console.log(event);
    let listadoServicios = await this.servicioService.obtenerServicio(event);
    this.formServicio.get('descripcion').setValue((<any>listadoServicios).DESCRIPCION);
    this.formServicio.get('monto').setValue(this.decimalPipe.transform((<any>listadoServicios).MONTO, '1.2-2'));
    // console.log(listadoServicios);
  }
}
