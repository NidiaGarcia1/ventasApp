import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Venta } from 'src/app/interfaces/venta';
import { VentaService } from 'src/app/servicios/venta/venta.service';

@Component({
  selector: 'app-listar-venta',
  templateUrl: './listar-venta.component.html',
  styleUrls: ['./listar-venta.component.css']
})
export class ListarVentaComponent implements OnInit {
  lista_ventas : Venta[];
  venta_seleccionada : Venta;
  public isCollapsed = true;
  constructor(private ngbModal: NgbModal, private ventaService: VentaService) {
    this.inicializarVariables();
   }

  ngOnInit(): void {
    this.listarVentas();
  }

  listarVentas(){
    this.ventaService.listarVentas().subscribe((ventas)=>{
      this.lista_ventas = ventas;
    });
  }

  AbrirModalAgregarVenta(modalAgregarVenta){
    this.ngbModal
      .open(modalAgregarVenta,{
        centered: true,
        size: 'xl',
        scrollable: true,
        backdrop: 'static',
      })
      .result.then(
        (result) => {},
        (result) => {}
      );
  }

  
  abrirModalDetalles(modalDetalles, venta){
    this.venta_seleccionada = venta;
    this.ngbModal
    .open(modalDetalles,{
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
    this.lista_ventas = []
  }


}
