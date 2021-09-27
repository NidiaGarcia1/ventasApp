import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/servicios/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  lista_menus: any;
  constructor(private menuService:MenuService, private router: Router) { }

  ngOnInit(): void {
    this.menuService.listarMenus().subscribe((menus)=>{
      this.lista_menus = menus;
    })
  }


  navegarMenu(menu:any){
    console.log("ruta");
    let ruta= '../'+ menu.ruta;
    this.router.navigate([ruta])
  }
}
