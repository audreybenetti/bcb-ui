import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente, ClienteService } from '../../services/cliente.service';
import { MenuComponent } from '../../components/menu/menu.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    PrimaryInputComponent,
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  editForm!: FormGroup;
  cliente!: Cliente; 
  plano: string = '';
  limiteCredito: number | null = null;
  saldo: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private toastService: ToastrService
  ) {this.editForm = new FormGroup( {
    plano: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.planoValidator()
    ]),
    limiteCredito: new FormControl('', [Validators.required]),
    saldo: new FormControl('', [Validators.required]),
  })}

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email') ?? '';
    this.clienteService.buscarClientePorEmail(email).subscribe(data => {
      this.cliente = data;
      this.plano = data.nomePlano;
      if (data.nomePlano === 'PÓS_PAGO') {
        this.limiteCredito = data.limiteCredito;
      } else if (data.nomePlano === 'PRÉ_PAGO') {
        this.saldo = data.saldo;
      }
    });
  }

  saveChanges(): void {
    const plano = this.editForm.get('plano')?.value;
    const limiteCredito = this.editForm.get('limiteCredito')?.value;
    const saldo = this.editForm.get('saldo')?.value;

    let saldoFinal = 0;
    if (limiteCredito) {
      saldoFinal = limiteCredito;
    } else if (saldo) {
      saldoFinal = saldo;
    }
    
    this.clienteService.alterarPlano(this.cliente.cnpj, saldoFinal, plano)
      .subscribe({
        next: () => {
          this.toastService.success('Plano alterado com sucesso.');
          this.router.navigate(['/customer', this.cliente.email]);
        },
        error: (error) => {
          console.error('Erro ao alterar plano.', error);
          this.toastService.error('Erro ao alterar plano.');
        }
      });
  }

  planoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validPlanos = ['PÓS-PAGO', 'PRÉ-PAGO'];
      const isValid = validPlanos.includes(control.value);
      
      return !isValid ? { invalidPlano: { value: control.value } } : null;
    };
  }
}
