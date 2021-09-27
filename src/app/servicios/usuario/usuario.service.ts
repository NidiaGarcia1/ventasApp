import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  coleccion_usuarios:string = 'usuarios'
  coleccion_roles:string = 'roles'
  usuario_actual: any; //variable que permace todo el ciclo de vida del servicio
  constructor(
    private afs:AngularFirestore, 
    private httpClient:HttpClient,
    private router: Router
    ) {
      this.usuario_actual = JSON.parse(window.localStorage.getItem('VENTAS_APP_USER'));
     }

  acceder(usuario:Usuario){
    return this.afs.collection(this.coleccion_usuarios, ref => 
      ref
      .where('correo','==',usuario.correo)
      .where('contrasena','==',usuario.contrasena)
      .limit(1)
    )
    .valueChanges()
    .subscribe((usuarios)=>{
      if(usuarios.length > 0 ){
        window.localStorage.setItem('VENTAS_APP_USER',JSON.stringify(usuarios[0])
        );
        this.usuario_actual = usuarios[0];
        this.router.navigate(['../menu']);
      }else{
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
  
  listarUsuarios(){
    return this.afs.collection(this.coleccion_usuarios).valueChanges()
  }

  listarRoles(){
    return this.afs.collection(this.coleccion_roles).valueChanges()
  }


  agregarUsuario(usuario:Usuario){
    usuario.usuario_id = this.agregarCodigoId(usuario)
    return  this.afs.doc(this.coleccion_usuarios+'/'+ usuario.usuario_id).set(usuario)
  }

  editarUsuario(usuario:Usuario){
    return  this.afs.doc(this.coleccion_usuarios+'/'+ usuario.usuario_id).update(usuario)
  }

  eliminarUsuario(usuario_id){
    return  this.afs.doc(this.coleccion_usuarios+'/'+ usuario_id).delete()
  }

  agregarCodigoId(usuario:Usuario){
    let fecha_actual_ms:string = new Date().getTime().toString()
    let letra_nombre:string = usuario.nombres.substring(0,3)
    return fecha_actual_ms + letra_nombre
  }

  //Consumiendo un servicio rest de tipo GET desde
  url:string = 'https://gorest.co.in/public/v1/users';
  listarUsuariosRest(){
    return this.httpClient.get(this.url);
  }

  checkLoging(){
    if(this.usuario_actual){
      return true;
    }else {
      return false;
    }
  }

  logOut() {
    this.usuario_actual = null;
    window.localStorage.removeItem('VENTAS_APP_USER');
    this.router.navigate(['../login']);
  }

}
