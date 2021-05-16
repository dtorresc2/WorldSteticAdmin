import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-costos',
  templateUrl: './costos.component.html',
  styleUrls: ['./costos.component.css']
})
export class CostosComponent implements OnInit {
  costos = [];
  // Paginacion
  page = 1;
  pageSize = 10;

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 25; i++) {
      this.costos.push({
        ID: (i + 1),
        DESCRIPCION: "COSTO",
        FECHA: "12/10/2020",
        MONTO: 12.32
      });
    }
  }

}
