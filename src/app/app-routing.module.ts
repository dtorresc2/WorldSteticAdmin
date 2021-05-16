import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./routes/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'catalogos',
    loadChildren: () => import('./routes/catalogos/catalogos.module').then(m => m.CatalogosModule)
  },
  {
    path: 'facturas',
    loadChildren: () => import('./routes/facturas/facturas.module').then(m => m.FacturasModule)
  },
  {
    path: 'finanzas',
    loadChildren: () => import('./routes/finanzas/finanzas.module').then(m => m.FinanzasModule)
  },
  {
    path: '**',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
