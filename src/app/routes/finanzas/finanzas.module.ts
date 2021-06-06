import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { FinanzasRoutingModule } from './finanzas-routing.module';
import { BalanceGeneralComponent } from './balance-general/balance-general.component';
import { CostosComponent } from './costos/costos.component';
import { FinanzasComponent } from './finanzas/finanzas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompraService } from 'src/app/services/compras/compra.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComprasPipe } from 'src/app/pipes/compras/compras.pipe';


@NgModule({
  declarations: [
    BalanceGeneralComponent,
    CostosComponent,
    FinanzasComponent,
    ComprasPipe
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FinanzasRoutingModule,
  ],
  providers: [
    CompraService,
    DecimalPipe
  ]
})
export class FinanzasModule { }
