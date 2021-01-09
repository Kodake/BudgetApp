import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  constructor(public budgetService: BudgetService, private router: Router) { }

  ngOnInit(): void {
    if (this.budgetService.presupuesto === 0) {
      this.router.navigate(['/ingresarPresupuesto']);
    }
  }

}
