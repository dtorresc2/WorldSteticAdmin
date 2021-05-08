import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogosRoutingModule } from './catalogos-routing.module';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { ListaClientesComponent } from './clientes/lista-clientes/lista-clientes.component';
import { FormClientesComponent } from './clientes/form-clientes/form-clientes.component';
import { CatalogosComponent } from './catalogos/catalogos.component';


@NgModule({
  declarations: [ClientesComponent, ListaClientesComponent, FormClientesComponent, CatalogosComponent],
  imports: [
    CommonModule,
    CatalogosRoutingModule
  ]
})
export class CatalogosModule { }
