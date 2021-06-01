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

  public exampleData: Array<Select2OptionData>;
  public options: Options;

  public formControl = new FormControl();

  cliente: FormGroup;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private clienteService: ClientesService,
    private servicioService: ServiciosService,
    private facturaService: FacturaService
  ) {
    this.formFactura = new FormGroup({
      serie: new FormControl('', [Validators.required]),
      numero_factura: new FormControl('', [Validators.required]),
      nombre_factura: new FormControl('', [Validators.required]),
      direccion_factura: new FormControl('', [Validators.required]),
      nit: new FormControl('', [Validators.required]),
      telefono: new FormControl('', []),
      correo: new FormControl('', []),
      saldo: new FormControl('', []),
      estado: new FormControl('', [Validators.required]),
      credito: new FormControl('', [Validators.required]),
      cliente: new FormControl('', [Validators.required])
    }, {
      validators: nitMatchValidator
    });
  }

  async ngOnInit() {
    await this.obtenerCombos();
    this.carga = true;

    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.modoEdicion = true;
      this.ID_FACTURA = params.id;

      console.log(await this.facturaService.obtenerFactura(this.ID_FACTURA));

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
}
