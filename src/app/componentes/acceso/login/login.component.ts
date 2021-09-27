import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:Usuario;
  constructor(private usuarioService:UsuarioService, private router:Router) {
    this.inicializarVariables();
  }

  ngOnInit(): void {
    if(window.localStorage.getItem('VENTAS_APP_USER')){
      this.router.navigate(['../menu'])
    }
  }

  ingresar(frmAcceso:NgForm){
    console.log("ingresando")
    if(frmAcceso.valid){
      this.usuarioService.acceder(this.usuario);
    }else{
      alert('Llene todos los campos de acceso');
    }
  }

  inicializarVariables(){
    this.usuario = {};
  }
}
