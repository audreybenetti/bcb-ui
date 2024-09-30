import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../model/cliente';
import { Plano } from '../../model/plano-enum';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../components/menu/menu.component';
import { PrimaryOutputComponent } from '../../components/primary-output/primary-output.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { ToastrService } from 'ngx-toastr';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MenuComponent,
    PrimaryOutputComponent,
    PrimaryInputComponent,
    ButtonComponent
  ],
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  cliente!: Cliente; 
  email: string;
  Plano = Plano;
  userRole = "";
  planoEditado: string = '';
  limiteEditado: number = 0; 
  saldoEditado: number = 0; 
  editPlano: boolean = false;
  editLimite: boolean = false;
  editSaldo: boolean = false;

  constructor (
    private router: Router,
    private route: ActivatedRoute, 
    private clienteService: ClienteService,
    private toastService: ToastrService,) {
    
    this.email = this.route.snapshot.paramMap.get('cnpj') || '';
    this.userRole = sessionStorage.getItem('role') || 'user'; 
  }

  ngOnInit(): void {
    var email = '';
    if (this.userRole === 'user') {
      this.email = sessionStorage.getItem('email') ?? '';
    } else {
      email = this.email;
    }

    if (email) {
      this.clienteService.buscarClientePorEmail(email).subscribe({
        next: (cliente: Cliente) => {
          if (cliente) {
            this.cliente = cliente;
          }
        },
        error: (error) => {
          console.error('Cliente não encontrado.', error);
          this.toastService.error('Erro ao buscar detalhes do cliente.');
        }
      });
    }
  }

  canEdit(): boolean {
    return this.userRole !== 'user';
  }

  alterarPlano(): void {
    this.router.navigate(['/customer/edit/', this.email]);
  }
}
