import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-ingresar-presupuesto',
  templateUrl: './ingresar-presupuesto.component.html',
  styleUrls: ['./ingresar-presupuesto.component.css']
})
export class IngresarPresupuestoComponent implements OnInit {

  cantidad: number;
  cantidadCorrecta: boolean;

  constructor(private budgetService: BudgetService, private router: Router) {
    this.cantidad = 0;
    this.cantidadCorrecta = false;
  }

  ngOnInit(): void {
  }

  agregar(): void {
    if (this.cantidad > 0) {
      this.cantidadCorrecta = false;
      this.budgetService.presupuesto = this.cantidad;
      this.budgetService.restante = this.cantidad;
      this.router.navigate(['/gastos'])
    } else {
      this.cantidadCorrecta = true;
    }
  }

}
