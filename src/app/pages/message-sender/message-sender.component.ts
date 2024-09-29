import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../components/menu/menu.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-message-sender',
  standalone: true,
  imports: [
    MenuComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    ButtonComponent
  ],
  templateUrl: './message-sender.component.html',
  styleUrl: './message-sender.component.scss'
})
export class MessageSenderComponent {
  messageForm!: FormGroup;
  constructor(
    private router: Router,
    private toastService: ToastrService) {
    this.messageForm = new FormGroup( {
      telefoneRemetente: new FormControl('', [Validators.required, Validators.minLength(8)]),
      telefoneDestinatario: new FormControl('', [Validators.required, Validators.minLength(8)]),
      mensagem: new FormControl('', [Validators.required, Validators.maxLength(140)]),
    })
  }

  submit() {
    console.log("Enviando...")
  }
}
