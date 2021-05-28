import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  constructor() { }

  fechaFormToBD(fecha): string {
    let splitDate = fecha.split('/');
    let year1 = splitDate[2];
    let month1 = splitDate[1];
    let day1 = splitDate[0];
    let date = year1 + "-" + month1 + "-" + day1;

    return date;
  }
}
