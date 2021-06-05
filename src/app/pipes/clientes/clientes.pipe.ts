import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientes'
})
export class ClientesPipe implements PipeTransform {

  transform(value: any, args: any): any {
    return null;
  }

}
