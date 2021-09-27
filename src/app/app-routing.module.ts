import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/acceso/login/login.component';
import { RegistrarComponent } from './componentes/acceso/registrar/registrar.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { ListarProductosComponent } from './componentes/producto/listar-productos/listar-productos.component';
import { ListarVentaComponent } from './componentes/venta/listar-venta/listar-venta.component';
import { GuardService } from './servicios/guard/guard.service';

const routes: Routes = [  
{ path: '', component: LoginComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegistrarComponent },
{ path: 'menu', component: MenuComponent, canActivate:[GuardService] },
{ path: 'producto', component: ListarProductosComponent, canActivate:[GuardService] },
{ path: 'venta', component: ListarVentaComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
