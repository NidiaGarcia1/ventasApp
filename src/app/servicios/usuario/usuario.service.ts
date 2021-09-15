import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  coleccion_usuarios:string = 'usuarios'
  coleccion_roles:string = 'roles'
  constructor(private afs:AngularFirestore, private httpClient:HttpClient) { }

  acceder(usuario:Usuario){
    return this.afs.collection(this.coleccion_usuarios, ref => 
      ref
      .where('correo','==',usuario.correo)
      .where('contrasena','==',usuario.contrasena)
      .limit(1)
    ).valueChanges();
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
}
