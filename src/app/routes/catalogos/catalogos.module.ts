import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

import { CatalogosRoutingModule } from './catalogos-routing.module';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { ListaClientesComponent } from './clientes/lista-clientes/lista-clientes.component';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormClientesComponent } from './clientes/form-clientes/form-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { FormUsuariosComponent } from './usuarios/form-usuarios/form-usuarios.component';
import { ServiciosComponent } from './servicios/servicios/servicios.component';
import { ListaServiciosComponent } from './servicios/lista-servicios/lista-servicios.component';
import { FormServiciosComponent } from './servicios/form-servicios/form-servicios.component';
import { ClientesService } from 'src/app/services/catalogos/clientes/clientes.service';
import { HttpClientModule } from '@angular/common/http';
import { FechaService } from 'src/app/services/utils/fecha.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiciosService } from 'src/app/services/catalogos/servicios/servicios.service';
import { UsuariosService } from 'src/app/services/catalogos/usuarios/usuarios.service';


@NgModule({
  declarations: [
    ClientesComponent, 
    ListaClientesComponent, 
    FormClientesComponent, 
    CatalogosComponent,
    UsuariosComponent,
    ListaUsuariosComponent,
    FormUsuariosComponent,
    ServiciosComponent,
    ListaServiciosComponent,
    FormServiciosComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CatalogosRoutingModule,
    
  ],
  providers: [
    ClientesService,
    DecimalPipe,
    DatePipe,
    FechaService,
    ServiciosService,
    UsuariosService
  ]
})
export class CatalogosModule { }
