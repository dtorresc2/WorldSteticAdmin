import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturasRoutingModule } from './facturas-routing.module';
import { FacturasComponent } from './facturas/facturas.component';
import { FormFacturasComponent } from './form-facturas/form-facturas.component';
import { ListaFacturasComponent } from './lista-facturas/lista-facturas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { MovimientosFacturasComponent } from './movimientos-facturas/movimientos-facturas.component';
import { NgSelect2Module } from 'ng-select2';
import { ClientesService } from 'src/app/services/catalogos/clientes/clientes.service';
import { HttpClientModule } from '@angular/common/http';
import { ServiciosService } from 'src/app/services/catalogos/servicios/servicios.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FacturaService } from 'src/app/services/facturas/factura.service';


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
    ReactiveFormsModule,
    NgSelect2Module,
    SharedModule,
    HttpClientModule,
    FacturasRoutingModule
  ],
  providers: [
    ClientesService,
    NgbActiveModal,
    ServiciosService,
    FacturaService
  ]
})
export class FacturasModule { }
