import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor() { }

  //canActivate devuelve un booleano dependiendo de logica de seguridad
  //que apliquemos a las rutas
  //lee a localStorage y si tiene retorna true 
  canActivate(route: ActivatedRouteSnapshot){
    let ruta = route['_routerState']['url']
    let usuario: Usuario = JSON.parse(window.localStorage.getItem('VENTAS_APP_USER'));

    if(usuario && this.tieneRol(usuario, ruta)){
      return true;
    }
    return false;
  }

  tieneRol(usuario, ruta): boolean{
    if(ruta == '/menu'){
      return true;
    }     
    let existe_rol = usuario.roles.find((rol) =>rol.ruta == ruta);
    if(existe_rol){
      return true;
    }else{
      return false;
    }
  }
}
