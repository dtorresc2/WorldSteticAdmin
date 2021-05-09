import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  clientes = [];
  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 15; i++) {
      this.clientes.push({
        ID: 1,
        NOMBRE: "Diego Roberto Torres Claros",
        NIT: "1232112312",
        SALDO: 12.32,
        ESTADO: 1,
      });
    }
  }

}
