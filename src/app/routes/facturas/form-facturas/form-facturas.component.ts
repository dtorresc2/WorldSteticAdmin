import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ClientesService } from 'src/app/services/catalogos/clientes/clientes.service';
import { ServiciosService } from 'src/app/services/catalogos/servicios/servicios.service';

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

  public exampleData: Array<Select2OptionData>;
  public options: Options;

  public formControl = new FormControl();

  cliente: FormGroup;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private clienteService: ClientesService,
    private servicioService: ServiciosService
  ) { }

  async ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.modoEdicion = true;
      this.ID_FACTURA = params.id;

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
  }
}
