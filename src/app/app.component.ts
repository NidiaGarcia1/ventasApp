import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './interfaces/usuario';
import { UsuarioService } from './servicios/usuario/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeSession: boolean;
  usuario:Usuario = {};
  constructor(private router:Router, private usuarioService:UsuarioService){
    this.usuario = JSON.parse(window.localStorage.getItem('VENTAS_APP_USER')) ;
  }
  
  checkLogin(){
    return this.usuarioService.checkLoging();
  }


  logOut(){
    window.localStorage.removeItem('VENTAS_APP_USER');
    this.router.navigate(['../login']);
  }
}
