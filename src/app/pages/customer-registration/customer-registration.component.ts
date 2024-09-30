import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MenuComponent } from '../../components/menu/menu.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ButtonComponent } from "../../components/button/button.component";
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../services/cliente.service';


@Component({
  selector: 'app-customer-registration',
  standalone: true,
  imports: [
    MenuComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    ButtonComponent
],
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.scss'
})
export class CustomerRegistrationComponent {
  registerForm!: FormGroup;
  constructor(
    private toastService: ToastrService,
    private clienteService: ClienteService) {
    this.registerForm = new FormGroup( {
      telefone: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cnpj: new FormControl('', [Validators.required, Validators.minLength(14)]),
      nomeResponsavel: new FormControl('', [Validators.required, Validators.minLength(10)]),
      cpfResponsavel: new FormControl('', [Validators.required, Validators.minLength(11)]),
    })
  }

  ngOnInit() {
    const email = sessionStorage.getItem('email') ?? '';
    if (email) {
      this.clienteService.buscarClientePorEmail(email).subscribe({
        next: (cliente: Cliente) => {
          if (cliente) {
            this.registerForm.patchValue({
              telefone: cliente.telefone,
              cnpj: cliente.cnpj,
              nomeResponsavel: cliente.nomeResponsavel,
              cpfResponsavel: cliente.cpfResponsavel
            });

            this.registerForm.disable();
            this.toastService.success('Cadastro já efetuado com sucesso!');
          }
        }
      });
    }
  }

  submit() {
    const cliente = new Cliente(
      sessionStorage.getItem('name') ?? "",
      sessionStorage.getItem('email') ?? "",
      this.registerForm.value.telefone,
      this.registerForm.value.cnpj,
      this.registerForm.value.nomeResponsavel,
      this.registerForm.value.cpfResponsavel,
      null,
      null,
      null,
      null
  );
  this.clienteService.cadastrarCliente(cliente).subscribe(
    response => {
        this.toastService.success('Cadastro realizado com sucesso!');
    },
    error => {
        console.error('Erro ao cadastrar cliente.', error);
        this.toastService.error('Erro ao efetuar cadastro.');
    }
);
}
}

