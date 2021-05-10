import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    SharedModule,
    InicioRoutingModule,
    
  ]
})
export class InicioModule { }
