import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturasComponent } from './facturas/facturas.component';
import { FormFacturasComponent } from './form-facturas/form-facturas.component';
import { ListaFacturasComponent } from './lista-facturas/lista-facturas.component';
import { MovimientosFacturasComponent } from './movimientos-facturas/movimientos-facturas.component';


const routes: Routes = [
  {
    path: '',
    component: FacturasComponent,
    children: [
      {
        path: '',
        component: ListaFacturasComponent
      },
      {
        path: 'crear',
        component: FormFacturasComponent
      },
      {
        path: ':id/editar',
        component: FormFacturasComponent
      },
      {
        path: ':id/movimientos',
        component: MovimientosFacturasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturasRoutingModule { }
