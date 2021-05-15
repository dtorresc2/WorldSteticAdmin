import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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


  cliente: FormGroup;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
