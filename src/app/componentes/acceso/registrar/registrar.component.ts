import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  usuario:Usuario;
  contrasena_confirmar:any;
  mensaje_contrasena:string;
  constructor(private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
    this.usuario = {};
    this.mensaje_contrasena = '';
  }

  registrarUsuario(frmRegistro: NgForm){
    if (frmRegistro.valid) {
      this.usuarioService.agregarUsuario(this.usuario).then(()=>{
        alert('Usuario registrado correctamente!')
        this.router.navigate(['../login'])
      })
    } else {
      alert('Formulario invalido! revise los campos obligatorios');
    }    
  }

  limpiarCampos(){}

  passwordDif():boolean{
    return this.usuario.contrasena != this.contrasena_confirmar ? true : false;
  }

  keyPress(event){
    if(this.passwordDif()){
      this.mensaje_contrasena = '';
    }else{
      this.mensaje_contrasena = '*Contraseñas no coinciden';
    }
  }

}
