import { Component, EventEmitter, Output } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { Cliente } from '../../model/cliente';
import { Plano } from '../../model/plano-enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimaryInputComponent } from "../../components/primary-input/primary-input.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-costumer-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenuComponent,
    PrimaryInputComponent
],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  constructor(private router: Router) {}
  filteredClients: Cliente[] = [];
  searchTerm: string = '';
  @Output("submit") onSubmit = new EventEmitter();
  private clientes: Cliente[] = [
    {
      nome: 'John Doe',
      email: 'john@example.com',
      telefone: '(XX) XXXXX-XXXX',
      cnpj: 'XXX/0001-XX',
      nomeResponsavel: 'Jane Doe',
      cpfResponsavel: 'XXX.XXX.XXX-XX',
      nomePlano: Plano.PRE_PAGO, // ou Plano.POS_PAGO
      saldo: 150.00, // Apenas para plano pré-pago
      creditoUtilizado: 50.00, // Apenas para plano pós-pago
      limiteCredito: 200.00, // Apenas para plano pós-pago
      dataCadastro: '2024-01-01'
    },
];

onSearchChange(searchValue: string): void {
  this.searchTerm = searchValue.toLowerCase();
  this.filteredClients = this.clientes.filter(cliente => 
      cliente.nome.toLowerCase().includes(this.searchTerm)
  );
}

getClientes(): Cliente[] {
    return this.clientes;
}

  submit(){
    this.onSubmit.emit();
  }

  openCustomer(cnpj: string): void {
    this.router.navigate(['/customer', cnpj]);
  }

}
