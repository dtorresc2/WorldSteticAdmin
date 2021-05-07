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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
