import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanzasRoutingModule } from './finanzas-routing.module';
import { BalanceGeneralComponent } from './balance-general/balance-general.component';
import { CostosComponent } from './costos/costos.component';


@NgModule({
  declarations: [BalanceGeneralComponent, CostosComponent],
  imports: [
    CommonModule,
    FinanzasRoutingModule
  ]
})
export class FinanzasModule { }
