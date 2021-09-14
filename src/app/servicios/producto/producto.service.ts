import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from 'src/app/interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
coleccion_productos:string = 'productos'

  constructor(private afs: AngularFirestore) { }

  listarProductos(){
    return this.afs.collection(this.coleccion_productos).valueChanges()
  }

  agregarProducto(producto:Producto){
    producto.producto_id = this.agregarCodigoId(producto)
    return  this.afs.doc(this.coleccion_productos+'/'+ producto.producto_id).set(producto)
  }

  editarProducto(producto:Producto){
    return  this.afs.doc(this.coleccion_productos+'/'+ producto.producto_id).update(producto)
  }

  eliminarProducto(producto_id){
    return  this.afs.doc(this.coleccion_productos+'/'+ producto_id).delete()
  }

  agregarCodigoId(producto:Producto){
    let fecha_actual_ms: string = new Date().getTime().toString();
    let letra_nombre: string = producto.nombre.substring(0,3);
    return fecha_actual_ms + letra_nombre;
  }
}
