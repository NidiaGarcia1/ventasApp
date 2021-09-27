import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './componentes/acceso/login/login.component';
import { RegistrarComponent } from './componentes/acceso/registrar/registrar.component';
import { AgregarProductosComponent } from './componentes/producto/agregar-productos/agregar-productos.component';
import { ListarProductosComponent } from './componentes/producto/listar-productos/listar-productos.component';
import { AgregarVentaComponent } from './componentes/venta/agregar-venta/agregar-venta.component';
import { ListarVentaComponent } from './componentes/venta/listar-venta/listar-venta.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './componentes/menu/menu.component';
import { FbdatePipe } from './pipes/fbdate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    AgregarProductosComponent,
    ListarProductosComponent,
    AgregarVentaComponent,
    ListarVentaComponent,
    MenuComponent,
    FbdatePipe
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig,'ventasapp-1276e'),
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
