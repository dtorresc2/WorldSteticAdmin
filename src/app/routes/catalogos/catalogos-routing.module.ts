import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogosModule } from './catalogos.module';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { FormClientesComponent } from './clientes/form-clientes/form-clientes.component';
import { ListaClientesComponent } from './clientes/lista-clientes/lista-clientes.component';
import { FormServiciosComponent } from './servicios/form-servicios/form-servicios.component';
import { ListaServiciosComponent } from './servicios/lista-servicios/lista-servicios.component';
import { ServiciosComponent } from './servicios/servicios/servicios.component';
import { FormUsuariosComponent } from './usuarios/form-usuarios/form-usuarios.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';


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
        path: ':id/editar',
        component: FormClientesComponent
      }
    ]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    children: [
      {
        path: '',
        component: ListaUsuariosComponent
      },
      {
        path: 'crear',
        component: FormUsuariosComponent
      },
      {
        path: ':id/editar',
        component: FormUsuariosComponent
      }
    ]
  },
  {
    path: 'servicios',
    component: ServiciosComponent,
    children: [
      {
        path: '',
        component: ListaServiciosComponent
      },
      {
        path: 'crear',
        component: FormServiciosComponent
      },
      {
        path: ':id/editar',
        component: FormServiciosComponent
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
