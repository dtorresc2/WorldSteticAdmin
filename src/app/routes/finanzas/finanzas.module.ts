import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanzasRoutingModule } from './finanzas-routing.module';
import { BalanceGeneralComponent } from './balance-general/balance-general.component';
import { CostosComponent } from './costos/costos.component';
import { FinanzasComponent } from './finanzas/finanzas.component';


@NgModule({
  declarations: [BalanceGeneralComponent, CostosComponent, FinanzasComponent],
  imports: [
    CommonModule,
    FinanzasRoutingModule
  ]
})
export class FinanzasModule { }
