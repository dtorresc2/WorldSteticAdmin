import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogosModule } from './catalogos.module';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { FormClientesComponent } from './clientes/form-clientes/form-clientes.component';
import { ListaClientesComponent } from './clientes/lista-clientes/lista-clientes.component';


const routes: Routes = [
  {
    path: '',
    component: CatalogosComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    children: [
      {
        path: '',
        component: ListaClientesComponent
      },
      {
        path: 'crear',
        component: FormClientesComponent
      },
      {
        path: 'ver/:id',
        component: FormClientesComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule { }
