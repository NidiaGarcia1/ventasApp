import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fbdate'
})
export class FbdatePipe implements PipeTransform {

  transform(fbFecha:any): Date {
    console.log(fbFecha.seconds);
    let dtFecha = new Date(1970,0,1);
    dtFecha.setSeconds(fbFecha.seconds);
    //let stFecha: string = dtFecha.getDay() + '/'+ dtFecha.getMonth() + '/'+ dtFecha.getFullYear();

    return dtFecha;
  }

}
