import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-listar-gastos',
  templateUrl: './listar-gastos.component.html',
  styleUrls: ['./listar-gastos.component.css']
})
export class ListarGastosComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  presupuesto: number;
  restante: number;
  devuelto: number;
  listGastos: any[] = [];

  constructor(private budgetService: BudgetService) {
    this.presupuesto = 0;
    this.restante = 0;
    this.subscription = this.budgetService.getGastos().subscribe(data => {
      this.restante = this.restante - data.cantidad;
      this.listGastos.push(data);
    });
  }

  ngOnInit(): void {
    this.presupuesto = this.budgetService.presupuesto;
    this.restante = this.budgetService.restante;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  aplicarColorRestante() {
    if(this.presupuesto / 4 > this.restante){
      return 'alert alert-danger';
    } else if(this.presupuesto / 2 > this.restante){
      return 'alert alert-warning';
    }else {
      return 'alert alert-secondary';
    }
  }

  removerGasto(idx: number) {
    //Creamos el objeto
    const ACREDITAR = {
      devuelto: this.listGastos[idx].cantidad
    }

    //Eliminamos el gasto del listado
    this.listGastos.splice(idx, 1);

    //Enviamos el objeto a los suscriptores via subject
    this.budgetService.removerGasto(ACREDITAR);
    this.restante = this.restante + ACREDITAR.devuelto;
  }

}
