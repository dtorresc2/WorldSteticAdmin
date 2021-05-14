import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})
export class ListaFacturasComponent implements OnInit {
  facturas = [];
  // Paginacion
  page = 1;
  pageSize = 10;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
