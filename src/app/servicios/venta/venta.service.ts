import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Venta } from 'src/app/interfaces/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  coleccion_venta:string = 'ventas'

  constructor(private afs:AngularFirestore) { 

  }

  registrarVenta(venta:Venta){
  venta.venta_id= this.agregarCodigoId(venta);
  return  this.afs.doc(this.coleccion_venta+'/'+ venta.venta_id).set(venta)
  }

   agregarCodigoId(venta:Venta){
    let fecha_actual_ms:string = new Date().getTime().toString()
    let letra_usuario:string = venta.usuario_id.substring(0,3)
    return fecha_actual_ms + letra_usuario;
  }
}
