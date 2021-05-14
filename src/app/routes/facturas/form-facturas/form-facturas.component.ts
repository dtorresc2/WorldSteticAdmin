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
    }
    else {
      this.modoEdicion = false;
    }
  }
}
