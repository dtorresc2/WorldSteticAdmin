import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceGeneralComponent } from './balance-general/balance-general.component';
import { CostosComponent } from './costos/costos.component';
import { FinanzasComponent } from './finanzas/finanzas.component';


const routes: Routes = [
  {
    path: '',
    component: FinanzasComponent
  },
  {
    path: 'balance',
    component: BalanceGeneralComponent
  },
  {
    path: 'costos',
    component: CostosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanzasRoutingModule { }
