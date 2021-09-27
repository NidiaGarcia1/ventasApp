import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  coleccion_menus: string = 'menus';

  constructor(private afs: AngularFirestore) { }

  listarMenus(){
    return this.afs.collection(this.coleccion_menus).valueChanges()
  }
}
