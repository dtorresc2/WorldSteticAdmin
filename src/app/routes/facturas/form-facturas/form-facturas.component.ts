import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

@Component({
  selector: 'app-form-facturas',
  templateUrl: './form-facturas.component.html',
  styleUrls: ['./form-facturas.component.css']
})
export class FormFacturasComponent implements OnInit {
  modoEdicion: boolean = false;
  ID_FACTURA: any = 0;
  model: NgbDateStruct;
  // model: NgbDateStruct;s

  detalleFactura = [];
  // Paginacion
  page = 1;
  pageSize = 5;

  // public test = 'value-changed-1';
  id_cliente = '';

  // public formControl = new FormControl();
  public exampleData: Array<Select2OptionData>;
  public options: Options;

  public formControl = new FormControl();

  cliente: FormGroup;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.exampleData = [
      {
        id: 'opt1',
        text: 'Options 1'
      },
      {
        id: 'opt2',
        text: 'Options 2'
      },
      {
        id: 'opt3',
        text: 'Options 3'
      },
      {
        id: 'opt4',
        text: 'Options 4'
      }
    ];

    this.options = {
      width: '300'
    };

    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.modoEdicion = true;
      this.ID_FACTURA = params.id;

      for (let i = 0; i < 25; i++) {
        this.detalleFactura.push({
          ID: (i + 1),
          CODIGO: (2 * i),
          NUMERO: (i + 1),
          CANTIDAD: (i + 3),
          DESCRIPCION: "Servicios 123123",
          MONTO_UNITARIO: 5.25,
          MONTO: 25.25,
        });
      }
    }
    else {
      this.modoEdicion = false;
    }
  }
}
