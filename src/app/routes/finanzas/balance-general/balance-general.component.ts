import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance-general',
  templateUrl: './balance-general.component.html',
  styleUrls: ['./balance-general.component.css']
})
export class BalanceGeneralComponent implements OnInit {
  ingresos = [];
  gastos = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 25; i++) {
      this.ingresos.push({
        DESCRIPCION: "INGRESO",
        MONTO: 12.55
      });

      this.gastos.push({
        DESCRIPCION: "GASTO",
        MONTO: 12.55
      });
    }
  }

}
