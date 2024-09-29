import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuComponent } from '../../components/menu/menu.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ButtonComponent } from "../../components/button/button.component";

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
    private router: Router,
    private toastService: ToastrService) {
    this.registerForm = new FormGroup( {
      telefone: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cnpj: new FormControl('', [Validators.required, Validators.minLength(14)]),
      nomeResponsavel: new FormControl('', [Validators.required, Validators.minLength(10)]),
      cpfResponsavel: new FormControl('', [Validators.required, Validators.minLength(11)]),
    })
  }

  submit() {
    console.log("Enviando...")
  }
}
