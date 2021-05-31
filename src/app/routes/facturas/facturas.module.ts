import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturasRoutingModule } from './facturas-routing.module';
import { FacturasComponent } from './facturas/facturas.component';
import { FormFacturasComponent } from './form-facturas/form-facturas.component';
import { ListaFacturasComponent } from './lista-facturas/lista-facturas.component';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovimientosFacturasComponent } from './movimientos-facturas/movimientos-facturas.component';
import { NgSelect2Module } from 'ng-select2';


@NgModule({
  declarations: [
    FacturasComponent, 
    FormFacturasComponent,
    ListaFacturasComponent,
    MovimientosFacturasComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgSelect2Module,
    FacturasRoutingModule
  ],
  providers: [
    NgbActiveModal
  ]
})
export class FacturasModule { }
