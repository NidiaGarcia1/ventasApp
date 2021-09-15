import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/interfaces/producto';
import { Usuario } from 'src/app/interfaces/usuario';
import { Venta } from 'src/app/interfaces/venta';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { VentaService } from 'src/app/servicios/venta/venta.service';

@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.component.html',
  styleUrls: ['./agregar-venta.component.css']
})
export class AgregarVentaComponent implements OnInit, AfterViewInit {

  lista_productos_disponibles:Producto[];
  lista_productos_seleccionados:any[];
  producto_seleccionado:any;
  monto_total:number;
  input_busqueda:string;
  lista_productos:Producto[];
  constructor(
    private productoService:ProductoService,
    private ngbModal:NgbModal, 
    private ventaService:VentaService,
    private usuarioServices:UsuarioService) { }

  ngOnInit(): void {
    this.inicializarVariables();
    this.listarUsuariosRest();
  }

listarUsuariosRest(){
  this.usuarioServices.listarUsuariosRest().subscribe((usuarios)=>{
    console.log("usuario_rest" , usuarios)
  });
}

  ngAfterViewInit(){
      this.productoService.listarProductos().subscribe((productos)=>{
        this.lista_productos = productos;
        this.lista_productos_disponibles = this.clonarObjeto(this.lista_productos);
        //JSON.parse(JSON.stringify(this.lista_productos));
      })
  }

  keyPress(event){
    console.log("keyPress", this.input_busqueda)
    this.filtrarDisponibles();
  }

  keyBackspace(event){
    console.log("keyBackspace", this.input_busqueda)
    this.filtrarDisponibles();
  }

  filtrarDisponibles(){
    setTimeout(()=>{
      this.lista_productos_disponibles = this.lista_productos.filter(
        (producto) => producto.nombre
        .toUpperCase()
        .includes(this.input_busqueda.toUpperCase()));
    });
  }

  agregarProducto(modalAgregar,producto){
    this.producto_seleccionado = producto;
    this.ngbModal.open(modalAgregar,{
      centered:true,
      size: 'lg',
      scrollable:true,
      backdrop: 'static',
    })
    .result.then(
      (result)=>{
        if(result == 'Save'){
          this.agregarProductoAlista();
        }
      },
      (reason)=> {}
    );
  }

  agregarProductoAlista(){
    this.lista_productos_seleccionados.push(this.producto_seleccionado);
    this.actualizarMontoTotal();
  }

  actualizarMontoTotal(){
    this.monto_total = 0;
    this.lista_productos_seleccionados.forEach(producto=>{
      this.monto_total += producto.precio * producto.cantidad;
    })
  }
  quitarProductoSeleccionado(indice){
    this.lista_productos_seleccionados.splice(indice, 1);
    this.actualizarMontoTotal();
  }

  generarVenta(){
    let usuario_registro: Usuario = this.obtenerUsuario();
    let nueva_venta: Venta = {
      usuario_id:usuario_registro.usuario_id, 
      detalles:this.lista_productos_seleccionados, 
      fecha_registro:new Date(), 
      monto_total:this.monto_total,
    };
    this.ventaService.registrarVenta(nueva_venta).then(()=>{
      alert('Venta registrada');
      this.inicializarVariables();
      this.listarUsuariosRest();
    }).catch(error=>{
      console.error('Error al hacer la venta', error);
    });
  }

  obtenerUsuario(){
    return JSON.parse(window.localStorage.getItem('VENTAS_APP_USER')) ;
  }

  clonarObjeto(objeto: any){
    return JSON.parse(JSON.stringify(objeto));
  }

  inicializarVariables(){
    this.lista_productos_disponibles=[];
    this.lista_productos_seleccionados=[];
    this.producto_seleccionado={};
    this.monto_total= 0;
    this.input_busqueda = '';
    this.lista_productos = [];
  }


}
