import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/acceso/login/login.component';
import { RegistrarComponent } from './componentes/acceso/registrar/registrar.component';

const routes: Routes = [  
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegistrarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
