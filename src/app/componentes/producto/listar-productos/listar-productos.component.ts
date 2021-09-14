import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/servicios/producto/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
lista_productos: Producto[];
imagenSeleccionada: string;

  constructor(private ngbModal:NgbModal, private productoService:ProductoService) { 
    this.inicializarVariables();
  }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(){
    this.productoService.listarProductos().subscribe((productos)=>{
      this.lista_productos = productos;
    });
  }

  abrirModalAgregar(modalAgregar){
    this.ngbModal
      .open(modalAgregar,{
        centered: true,
        size: 'lg',
        scrollable: true,
        backdrop: 'static',
      })
      .result.then(
        (result) => {},
        (result) => {}
      );
  }

  abrirModalImagen(modalImagen, url_imagen){
    this.imagenSeleccionada = url_imagen;
    this.ngbModal
      .open(modalImagen,{
        centered: true,
        size: 'lg',
        scrollable: true,
        backdrop: 'static',
      })
      .result.then(
        (result) => {},
        (result) => {}
      );
  }

  inicializarVariables(){
    this.lista_productos = [];
    this.imagenSeleccionada = '';
  }

}
