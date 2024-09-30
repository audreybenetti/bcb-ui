import { Component, EventEmitter, Output } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { Cliente } from '../../model/cliente';
import { Plano } from '../../model/plano-enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimaryInputComponent } from "../../components/primary-input/primary-input.component";
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private router: Router, private clienteService: ClienteService, private toastService : ToastrService) {}
  filteredClients: Cliente[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  @Output("submit") onSubmit = new EventEmitter();
  private clientes: Cliente[] = [];

  ngOnInit() {
    this.fetchClientes();
  }

  onSearchChange(searchValue: string): void {
    this.searchTerm = searchValue.toLowerCase();
    this.filteredClients = this.clientes.filter(cliente => 
        cliente.nome.toLowerCase().includes(this.searchTerm)
    );
  }

  fetchClientes() {
    this.loading = true;
    this.clienteService.buscarClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar clientes:', error);
        this.toastService.error('Erro ao buscar clientes.');
        this.loading = false;
      }
    });
  }


  getClientes(): Cliente[] {
    return this.clientes;
  }

  submit(){
    this.onSubmit.emit();
  }

  openCustomer(email: string): void {
    this.router.navigate(['/customer', email]);
  }

}
